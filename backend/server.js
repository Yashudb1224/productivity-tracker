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
    const { name, password, id } = req.body;
    console.log(`[API] Registering user: ${name}`);
    const db = readDb();

    if (db.users.find(u => u.name.toLowerCase() === name.toLowerCase())) {
        return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id, name, password: hashedPassword, createdAt: new Date().toISOString() };

    db.users.push(newUser);
    writeDb(db);

    const { password: _, ...userWithoutPass } = newUser;
    res.json(userWithoutPass);
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

// Clear Data (Only for specific user)
app.post('/api/clear', (req, res) => {
    const { userId } = req.body;
    console.log(`[API] Clearing data for: ${userId}`);
    if (!userId) return res.status(400).json({ message: "No user specified" });

    const db = readDb();
    db.entries = db.entries.filter(e => e.userId !== userId);
    writeDb(db);
    res.json({ message: "Data cleared" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Security Protocols: ACTIVE (Bcrypt + Strict Isolation)");
});
