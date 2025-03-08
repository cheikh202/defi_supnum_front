'use client';
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    

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
                    placeholder="confirm Mot de passe" 
                    className="p-2 bg-gray-200 rounded-md m-2 shadow-sm w-full outline-none focus:ring-2 focus:ring-blue-400"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white" >
                    S'inscrire
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
