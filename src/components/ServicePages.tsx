"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ballImg from "@/assets/images/ball.png";
import { PAGES } from "@/config/navegation";

interface ServiceBall {
    name: string;
    link: string;
    enabled: boolean;
    isPlaceholder?: boolean;
    x: number;
    y: number;
}

const BALL_SIZE = 150;
const STAR_SIZE = 60;
const CORE_PAD = 6;

const ENABLED_NAMES = new Set(["Chat", "Sobre Mim"]);

const SERVICES = [
    ...PAGES.map((page) => {
        if (page.name === "Admin") {
            return {
                name: "",
                link: "",
                enabled: false,
                isPlaceholder: true,
            };
        }

        return {
            ...page,
            enabled: ENABLED_NAMES.has(page.name),
        };
    }),
    { name: "", link: "", enabled: false, isPlaceholder: true },
    { name: "", link: "", enabled: false, isPlaceholder: true },
    { name: "", link: "", enabled: false, isPlaceholder: true },
    { name: "", link: "", enabled: false, isPlaceholder: true },
];

const CRUZEIRO_POSITIONS = [
    { x: 0.5, y: 0.15 },
    { x: 0.6, y: 0.25 },
    { x: 0.4, y: 0.3 },
    { x: 0.55, y: 0.4 },
    { x: 0.45, y: 0.55 },
    { x: 0.1, y: 0.1 },
    { x: 0.9, y: 0.1 },
    { x: 0.1, y: 0.9 },
];

const TAURO_POSITIONS = [
    { x: 0.5, y: 0.25 },
    { x: 0.6, y: 0.2 },
    { x: 0.62, y: 0.28 },
    { x: 0.42, y: 0.32 },
    { x: 0.45, y: 0.42 },
    { x: 0.52, y: 0.45 },
    { x: 0.38, y: 0.38 },
    { x: 0.5, y: 0.15 },
    { x: 0.57, y: 0.35 },
    { x: 0.47, y: 0.5 },
    { x: 0.65, y: 0.48 },
    { x: 0.35, y: 0.25 },
];

export default function ServicePages() {
    const [balls, setBalls] = useState<ServiceBall[]>([]);
    const [showCruzeiro, setShowCruzeiro] = useState(true);

    const updatePositions = () => {
        const containerWidth = window.innerWidth * 0.8;
        const containerHeight = window.innerHeight * 0.75;

        const constellation = showCruzeiro ? CRUZEIRO_POSITIONS : TAURO_POSITIONS;

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

        const interval = setInterval(() => {
            setShowCruzeiro((prev) => !prev);
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
                const isEnabled = ball.enabled;
                const size = isService ? BALL_SIZE : STAR_SIZE;

                return (
                    <div
                        key={`${ball.name}-${idx}`}
                        onClick={() => {
                            if (!isEnabled) return;
                            if (ball.link) window.location.href = ball.link;
                        }}
                        className={isEnabled ? "service-glow" : ""}
                        style={{
                            position: "absolute",
                            left: ball.x,
                            top: ball.y,
                            width: size,
                            height: size,
                            cursor: isService && isEnabled ? "pointer" : "default",
                            transform: "translate(-50%, -50%)",
                            borderRadius: "50%",
                            overflow: "visible",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#fff",
                            textShadow: isEnabled ? "0 0 12px rgba(255,0,0,0.6)" : "0 0 5px #000",
                            transition: "all 0.6s ease",
                            zIndex: isService ? 1 : -5,
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                inset: CORE_PAD / 2,
                                borderRadius: "9999px",
                                overflow: "hidden",
                            }}
                        >
                            <Image src={ballImg} alt={ball.name || "star"} fill style={{ objectFit: "cover" }} />
                        </div>

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
