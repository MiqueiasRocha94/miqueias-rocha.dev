"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import Image from "next/image";
import bgPlacaMae from "@/assets/images/placa-mae-bg.png";
import mobile from "@/assets/images/mobile-bg.png";
import {useEffect, useState} from "react";
import {useAuth} from "@/contexts/AuthContext";
import { isBiometricAvailable, authenticateBiometric } from "@/lib/Biometric"
import { useDevice } from "@/contexts/DeviceContext";

export default function LoginPage() {
    const [biometricReady, setBiometricReady] = useState(false);
    const [useBiometric, setUseBiometric] = useState(true);
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, user } = useAuth();
    const { isMobile } = useDevice();

    const isFormValid = username.trim() !== "" && password.trim() !== "";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        if(login(username, password)){
            router.push("/admin");
        }else {
            setError("Usuário ou senha inválidos");

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    useEffect(() => {
        const checkBiometric = async () => {
            if (isMobile) {
                const available = await isBiometricAvailable();
                setBiometricReady(available);
                setUseBiometric(available); // ativa automático se disponível
            }
        };

        checkBiometric();
    }, [isMobile]);

    const handleBiometricLogin = async () => {
        const success = await authenticateBiometric();

        if (success) {
            // 🔴 aqui você decide como autenticar
            // exemplo: login automático com token salvo

            if (login("BIOMETRIC_USER", "BIOMETRIC_TOKEN")) {
                router.push("/admin");
            }
        }
    };

    useEffect(() => {
        if (user) {
            router.push("/admin");
        }
    }, [user, router]);


    return (
        <div
            className={`relative flex items-center justify-center overflow-hidden ${
                isMobile ? "min-h-screen w-full" : "h-screen w-screen"
            }`}
        >

            {/* Fundo da placa-mãe */}
            <div
                className="absolute inset-0 z-0 "
            >
                <Image
                    src={isMobile ? mobile: bgPlacaMae}
                    alt="Fundo placa-mãe"
                    fill
                    priority
                />
            </div>

            {/* Overlay preto semi-transparente */}
            <div className="absolute inset-0 bg-black/70 z-10"></div>

            {/* LEDs laterais animados */}
            <div className="absolute left-0 top-0 h-full w-2 bg-red-600 opacity-30 animate-pulse z-20"></div>
            <div className="absolute right-0 top-0 h-full w-2 bg-red-600 opacity-30 animate-pulse z-20"></div>

            {error && (
                <div className="bg-black border border-red-600 text-red-500 px-6 py-3 rounded-lg shadow-[0_0_15px_#ff0000] animate-pulse backdrop-blur-md">
                    {error}
                </div>
            )}

            {/* Container de login */}
            <form
                onSubmit={handleLogin}
                className={`relative z-30 login-container bg-darkBg border-2 border-neonRed rounded-xl p-8 sm:p-10 -translate-y-3 text-center shadow-[0_0_30px_#ff0000,0_0_60px_#ff0000_inset] animate-glow flex flex-col justify-between ${
                    isMobile
                        ? "w-[85vw] max-w-[90vw] h-auto min-h-[320px]"
                        : "w-[52vh] max-w-[90%] h-[38vh] max-h-[80%]"
                }`}
            >
                <h2 className="text-neonRed text-3xl mb-6 uppercase tracking-widest animate-textGlow">
                    Login
                </h2>

                {/* 🔐 MODO BIOMÉTRICO */}
                {isMobile && biometricReady && useBiometric ? (
                    <div className="flex flex-col items-center justify-center gap-6 flex-1">
                        {/* Ícone biometria */}
                        <div
                            onClick={handleBiometricLogin}
                            className="cursor-pointer text-white text-6xl hover:scale-110 transition"
                        >
                            🔒
                        </div>

                        <span className="text-gray-300 text-sm">
                Toque para autenticar
            </span>

                        {/* Botão fallback */}
                        <button
                            type="button"
                            onClick={() => setUseBiometric(false)}
                            className="mt-4 py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                        >
                            Entrar com usuário e senha
                        </button>
                    </div>
                ) : (
                    <>
                        {/* 🔑 FORM LOGIN */}
                        <div className="flex-1 flex flex-col justify-center gap-4">
                            <input
                                type="text"
                                placeholder="Usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 bg-black border border-neonRed rounded-md text-white focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_#ff0000]"
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-black border border-neonRed rounded-md text-white focus:outline-none focus:border-red-500 focus:shadow-[0_0_10px_#ff0000]"
                            />
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={`w-full sm:w-[48%] py-2 font-bold uppercase tracking-wide rounded-md transition
                        ${isFormValid
                                    ? "bg-cyan-600 text-black hover:bg-cyan-700 hover:shadow-[0_0_20px_#00ffff]"
                                    : "bg-gray-600 text-black cursor-not-allowed opacity-60"
                                }`}
                            >
                                Entrar
                            </button>

                            <Link href="/">
                                <button
                                    type="button"
                                    className="w-full sm:w-[48%] py-2 bg-neonRed text-black font-bold uppercase tracking-wide rounded-md hover:bg-red-700 hover:shadow-[0_0_20px_#ff0000] transition"
                                >
                                    Sair
                                </button>
                            </Link>
                        </div>

                        {/* 🔙 VOLTAR PARA BIOMETRIA */}
                        {isMobile && biometricReady && (
                            <button
                                type="button"
                                onClick={() => setUseBiometric(true)}
                                className="mt-4 text-sm text-gray-400 hover:text-white transition"
                            >
                                Usar biometria
                            </button>
                        )}
                    </>
                )}
            </form>
        </div>
    );
}
