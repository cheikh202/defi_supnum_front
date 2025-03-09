'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) {
            return toast.error("Tous les champs sont obligatoires !");
        }
        if (password !== confirmPassword) {
            return toast.error("Les mots de passe ne correspondent pas !");
        }

        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ login:name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l&apos;inscription");
            }

            toast.success("Inscription réussie !");
            router.push("/login");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Une erreur s&apos;est produite");
            }
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg p-8 rounded-lg w-[350px] flex flex-col items-center">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Inscription</h1>
                <Toaster position="top-left" expand={false} richColors closeButton />

                <input
                    type="text"
                    placeholder="Nom"
                    className="p-2 bg-gray-200 rounded-md m-2 shadow-sm w-full outline-none focus:ring-2 focus:ring-blue-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 bg-gray-200 rounded-md m-2 shadow-sm w-full outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="p-2 bg-gray-200 rounded-md m-2 shadow-sm w-full outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    className="p-2 bg-gray-200 rounded-md m-2 shadow-sm w-full outline-none focus:ring-2 focus:ring-blue-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button 
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleSignUp}
                    disabled={loading}
                >
                    {loading ? "Inscription..." : "S&apos;inscrire"}
                </Button>

                <p className="mt-4 text-sm text-gray-600">
                    Vous avez déjà un compte ?  
                    <span
                        className="text-blue-500 cursor-pointer hover:underline ml-1"
                        onClick={() => router.push("/login")}
                    >
                        Connexion
                    </span>
                </p>
            </div>
        </div>
    );
}
