"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ballImg from "@/assets/images/ball.png";
import {PAGES} from "@/config/navegation";

interface ServiceBall {
    name: string;
    link: string;
    x: number;
    y: number;
}

const BALL_SIZE = 150;

const SERVICES = [
    ...PAGES,
    { name: "", link: "" },
    { name: "", link: "" },
    { name: "", link: "" },
    { name: "", link: "" },
];

// Cruzeiro do Sul (8 posições)
const CRUZEIRO_POSITIONS = [
    { x: 0.5, y: 0.15 },// α Crucis — Acrux ⭐ (principal inferior)
    { x: 0.6, y: 0.25 },// β Crucis — Mimosa
    { x: 0.4, y: 0.3 },// γ Crucis — Gacrux
    { x: 0.55, y: 0.4 },// δ Crucis
    { x: 0.45, y: 0.55 },
    // ✨ Estrelas extras nos cantos (limitadas)
    { x: 0.1, y: 0.1 },
    { x: 0.9, y: 0.1 },
    { x: 0.1, y: 0.9 },
];



// Touro (12 posições aproximadas, 8 principais para aplicações + 4 extras)
const TAURO_POSITIONS = [
    { x: 0.5, y: 0.25 },  // α Tauri — Aldebarã ⭐ (Sobre Mim - MAIOR)
    { x: 0.6, y: 0.2 },   // β Tauri — Elnath (Web Cloud)
    { x: 0.62, y: 0.28 }, // ζ Tauri (Chat)
    { x: 0.42, y: 0.32 }, // γ Tauri (Admin)
    { x: 0.45, y: 0.42 }, // δ Tauri (Analytics)
    { x: 0.52, y: 0.45 }, // ε Tauri (Notifications)
    { x: 0.38, y: 0.38 }, // θ Tauri (Settings)
    { x: 0.5, y: 0.15 },  // M45 — Plêiades (Help)

    // ⭐ Estrelas secundárias (devem receber esferas SEM nome)
    { x: 0.57, y: 0.35 }, // Hyades secundária 1
    { x: 0.47, y: 0.5 },  // Hyades secundária 2
    { x: 0.65, y: 0.48 }, // Região do chifre secundária
    { x: 0.35, y: 0.25 }, // Estrela fraca da testa
];

export default function ServicePages() {
    const [balls, setBalls] = useState<ServiceBall[]>([]);
    const [showCruzeiro, setShowCruzeiro] = useState(true);

    const updatePositions = () => {
        const containerWidth = window.innerWidth * 0.8;
        const containerHeight = window.innerHeight * 0.75;

        const constellation = showCruzeiro ? CRUZEIRO_POSITIONS : TAURO_POSITIONS;

        // usamos modulo para repetir posições caso haja mais serviços que posições
        const newBalls: ServiceBall[] = SERVICES.map((service, idx) => {
            const pos = constellation[idx % constellation.length];
            const x = pos.x * containerWidth;
            const y = pos.y * containerHeight;
            return { ...service, x, y };
        });

        setBalls(newBalls);
    };

    useEffect(() => {
        updatePositions();

        // alterna entre constelações a cada 10 segundos
        const interval = setInterval(() => {
            setShowCruzeiro(prev => !prev);
        }, 10000);

        window.addEventListener("resize", updatePositions);
        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", updatePositions);
        };
    }, [showCruzeiro]);

    useEffect(() => {
        updatePositions();
    }, [showCruzeiro]);

    return (
        <div
            style={{
                position: "relative",
                width: "80vw",
                height: "75vh",
                overflow: "hidden",
            }}
        >
            {balls.map((ball, idx) => {
                const isService = !!ball.name;

                return (
                    <div
                        key={idx}
                        onClick={() => ball.link && (window.location.href = ball.link)}
                        style={{
                            position: "absolute",
                            left: ball.x,
                            top: ball.y,
                            width: isService ? BALL_SIZE : 60,
                            height: isService ? BALL_SIZE : 60,
                            cursor: isService ? "pointer" : "default",
                            transform: "translate(-50%, -50%)",
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#fff",
                            textShadow: "0 0 5px #000",
                            transition: "all 1s ease",
                            zIndex: isService ? 1 : -5,
                        }}
                    >
                        <Image
                            src={ballImg}
                            alt={ball.name || "star"}
                            fill
                            style={{ objectFit: "cover" }}
                        />

                        {isService && (
                            <span style={{ position: "relative", zIndex: 2 }}>
                    {ball.name}
                </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}