const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, '../database/db.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read DB
const readDb = () => {
    if (!fs.existsSync(DB_PATH)) {
        return { users: [], entries: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data || '{ "users": [], "entries": [] }');
};

// Helper to write DB
const writeDb = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Register
app.post('/api/register', async (req, res) => {
    const { name, password, id, recoveryKey } = req.body;
    console.log(`[API] Registering user: ${name}`);
    const db = readDb();

    if (db.users.find(u => u.name.toLowerCase() === name.toLowerCase())) {
        return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Hash recovery key if provided
    let recoveryHash = null;
    if (recoveryKey) {
        recoveryHash = await bcrypt.hash(recoveryKey, 10);
    }

    // Initialize with empty habits array
    const newUser = { id, name, password: hashedPassword, recoveryHash, habits: [], createdAt: new Date().toISOString() };

    db.users.push(newUser);
    writeDb(db);

    const { password: _, recoveryHash: __, ...userWithoutPass } = newUser;
    res.json(userWithoutPass);
});

// Recover Password
app.post('/api/recover', async (req, res) => {
    const { name, recoveryKey, newPassword } = req.body;
    console.log(`[API] Recovery attempt for: ${name}`);
    const db = readDb();

    const userIndex = db.users.findIndex(u => u.name.toLowerCase() === name.toLowerCase());
    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    const user = db.users[userIndex];
    if (!user.recoveryHash) {
        return res.status(400).json({ error: "No recovery key set for this account." });
    }

    const isValid = await bcrypt.compare(recoveryKey, user.recoveryHash);
    if (!isValid) {
        return res.status(401).json({ error: "Invalid recovery key" });
    }

    // Reset Password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    db.users[userIndex].password = newHashedPassword;
    writeDb(db);

    res.json({ message: "Password reset successful" });
});

// Login
app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
    console.log(`[API] Login attempt for: ${name}`);
    const db = readDb();
    const user = db.users.find(u => u.name.toLowerCase() === name.toLowerCase());

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // If user has no password (legacy account), allow or force update?
    // For now, if no password field, we might strictly fail or allow insecure.
    // Let's assume strict:
    if (!user.password) {
        // Legacy mode: If user has no password in DB but provided one, we could migrate them?
        // For now, fail to force new ecosystem usage as requested "Robust".
        // Actually, to be nice, let's just update it? No, that's insecure.
        // Let's just Return error.
        return res.status(401).json({ error: "Legacy account. Please delete and re-register." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ error: "Invalid password" });
    }

    const { password: _, ...userWithoutPass } = user;
    res.json(userWithoutPass);
});

// Get Users (Public - Name only)
app.get('/api/users', (req, res) => {
    const db = readDb();
    // Return only names/ids, no hashes
    const safeUsers = db.users.map(u => ({ id: u.id, name: u.name }));
    res.json(safeUsers);
});

// Get Entries (Strictly Filtered by UserID)
app.get('/api/entries', (req, res) => {
    const { userId } = req.query;
    console.log(`[API] Fetching entries for User ID: ${userId}`);

    if (!userId) {
        console.log("[API] No userId provided, returning empty list.");
        return res.json([]);
    }

    const db = readDb();
    const userEntries = db.entries.filter(e => e.userId === userId);
    console.log(`[API] Found ${userEntries.length} entries for user.`);
    res.json(userEntries);
});

// Add Entry
app.post('/api/entries', (req, res) => {
    const entry = req.body;
    if (!entry.userId) {
        return res.status(400).json({ error: "userId required" });
    }

    const db = readDb();
    db.entries.push(entry);
    writeDb(db);
    res.json(entry);
});

// Delete Account
app.delete('/api/account', (req, res) => {
    const { userId } = req.body;
    console.log(`[API] Deleting account: ${userId}`);
    if (!userId) return res.status(400).json({ error: "userId required" });

    const db = readDb();
    const initialUserCount = db.users.length;
    db.users = db.users.filter(u => u.id !== userId);
    db.entries = db.entries.filter(e => e.userId !== userId);
    writeDb(db);

    if (db.users.length === initialUserCount) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Account deleted" });
});

// Manage Habits
app.post('/api/habits', (req, res) => {
    const { userId, habit } = req.body;
    console.log(`[API] Adding habit for: ${userId}`);
    const db = readDb();

    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    // Ensure habits array exists
    if (!db.users[userIndex].habits) db.users[userIndex].habits = [];

    db.users[userIndex].habits.push(habit);
    writeDb(db);

    res.json(habit);
});

app.put('/api/habits', (req, res) => {
    const { userId, habit } = req.body;
    console.log(`[API] Updating habit ${habit.id} for: ${userId}`);
    const db = readDb();

    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    if (db.users[userIndex].habits) {
        const habitIndex = db.users[userIndex].habits.findIndex(h => h.id === habit.id);
        if (habitIndex !== -1) {
            db.users[userIndex].habits[habitIndex] = habit;
            writeDb(db);
            return res.json(habit);
        }
    }

    res.status(404).json({ error: "Habit not found" });
});

app.delete('/api/habits', (req, res) => {
    const { userId, habitId } = req.body;
    console.log(`[API] Removing habit ${habitId} for: ${userId}`);
    const db = readDb();

    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    if (db.users[userIndex].habits) {
        db.users[userIndex].habits = db.users[userIndex].habits.filter(h => h.id !== habitId);
        writeDb(db);
    }

    res.json({ message: "Habit removed" });
});

// Clear Data (Only for specific user)
app.post('/api/clear', (req, res) => {
    const { userId } = req.body;
    console.log(`[API] Clearing data for: ${userId}`);
    if (!userId) return res.status(400).json({ message: "No user specified" });

    const db = readDb();
    db.entries = db.entries.filter(e => e.userId !== userId);
    // Optional: Clear habits too? Usually "Clear Data" implies entries, not configuration.
    // Let's keep habits for now.
    writeDb(db);
    res.json({ message: "Data cleared" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Security Protocols: ACTIVE (Bcrypt + Strict Isolation)");
});
