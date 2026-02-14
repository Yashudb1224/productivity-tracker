import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
            <SignIn routing="path" path="/login" />
        </div>
    );
}
