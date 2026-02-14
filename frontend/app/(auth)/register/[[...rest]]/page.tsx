import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
            <SignUp routing="path" path="/register" />
        </div>
    );
}
