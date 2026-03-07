"use client";

import { useEffect, useRef } from "react";

import headImg from "@/assets/images/dragon-head.png";
import segmentImg from "@/assets/images/dragon-Body-segments.png";
import frontLegsImg from "@/assets/images/dragon-Front-legs.png";
import backLegsImg from "@/assets/images/dragon-Back-legs.png";
import tailImg from "@/assets/images/dragon-tail.png";

export default function DragonCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        /* ===============================
           CONFIG
        =============================== */
        const BASE_SIZE = 150;
        const FOLLOW_SPEED = 0.01;
        const SEGMENT_SPACING = BASE_SIZE * 0.35;
        const IDLE_TIME = 2000;

        const NECK = 10;
        const BODY = 20;
        const TAIL = 20;

        let lastMoveTime = Date.now();
        let autonomous = false;

        let target = { x: 0, y: 0 };

        const STRUCTURE = [
            { type: "head", size: BASE_SIZE * 1.4 },
            ...Array(NECK).fill({ type: "segment", size: BASE_SIZE }),
            { type: "frontLegs", size: BASE_SIZE },
            ...Array(BODY).fill({ type: "segment", size: BASE_SIZE }),
            { type: "backLegs", size: BASE_SIZE * 1.2 },
            ...Array(TAIL).fill(0).map((_, i) => ({
                type: "segment",
                size: BASE_SIZE * (1 - i * 0.035),
            })),
            { type: "tail", size: BASE_SIZE * 0.5 },
        ];

        /* ===============================
           RESIZE
        =============================== */
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        /* ===============================
           LOAD IMAGES
        =============================== */
        function loadImages() {
            return {
                head: createImage(headImg.src),
                segment: createImage(segmentImg.src),
                frontLegs: createImage(frontLegsImg.src),
                backLegs: createImage(backLegsImg.src),
                tail: createImage(tailImg.src),
            };
        }

        function createImage(src: string) {
            const img = new Image();
            img.src = src;
            return img;
        }

        const images = loadImages();

        /* ===============================
           DRAGON STRUCTURE
        =============================== */
        function createDragon() {
            return STRUCTURE.map(() => ({
                x: canvas.width / 2,
                y: canvas.height / 2,
                angle: 0,
            }));
        }

        const parts = createDragon();

        /* ===============================
           MOUSE HANDLER
        =============================== */
        function handleMouse(e: MouseEvent) {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            lastMoveTime = Date.now();
            autonomous = false;
        }

        window.addEventListener("mousemove", handleMouse);

        document.addEventListener("visibilitychange", () => {
            autonomous = document.hidden;
        });

        /* ===============================
           AUTONOMOUS TARGET
        =============================== */
        const EDGE_MARGIN = 100;
        const ROUTE = [0,1,3,2,0,8,1,7,5,6,4,3,5,6,1,7,3,8,2,0,8,1,3]
        let routeIndex = 0;

        function getStrategicPoints() {
            const w = canvas.width;
            const h = canvas.height;
            const m = EDGE_MARGIN;
            //mapa da tela com os índices
            // 0       4       1
            //
            // 6       8       7
            //
            // 2       5       3

            return [
                { x: m, y: m },                 // 0 → Canto superior esquerdo
                { x: w - m, y: m },             // 1 → Canto superior direito
                { x: m, y: h - m },             // 2 → Canto inferior esquerdo
                { x: w - m, y: h - m },         // 3 → Canto inferior direito
                { x: w / 2, y: m },             // 4 → Meio superior
                { x: w / 2, y: h - m },         // 5 → Meio inferior
                { x: m, y: h / 2 },             // 6 → Meio esquerdo
                { x: w - m, y: h / 2 },         // 7 → Meio direito
                { x: w / 2, y: h / 2 },         // 8 → Centro da tela
            ];
        }

        function randomTarget() {
            const points = getStrategicPoints();

            const index = ROUTE[routeIndex];
            routeIndex++;

            target = points[index];
            if(routeIndex == ROUTE.length){
                routeIndex = 0;
            }
        }

        function handleAutonomousMovement() {
            if (Date.now() - lastMoveTime > IDLE_TIME) {
                autonomous = true;
            }

            if (autonomous) {
                const dist = Math.hypot(
                    parts[0].x - target.x,
                    parts[0].y - target.y
                );

                if (dist < 150) randomTarget();
            }

            return autonomous ? target : mouse.current;
        }

        /* ===============================
           UPDATE HEAD
        =============================== */
        function updateHead(targetPos: { x: number; y: number }) {
            const dx = targetPos.x - parts[0].x;
            const dy = targetPos.y - parts[0].y;

            parts[0].angle = Math.atan2(dy, dx);
            parts[0].x += dx * FOLLOW_SPEED;
            parts[0].y += dy * FOLLOW_SPEED;
        }

        /* ===============================
           UPDATE BODY
        =============================== */
        function updateBody() {
            for (let i = 1; i < parts.length; i++) {
                const prev = parts[i - 1];
                const curr = parts[i];

                const dx = prev.x - curr.x;
                const dy = prev.y - curr.y;

                const angle = Math.atan2(dy, dx);
                curr.angle = angle;

                const distance = Math.hypot(dx, dy);

                // Espaçamento proporcional ao tamanho do segmento
                const targetDistance =
                    (STRUCTURE[i].size / BASE_SIZE) * SEGMENT_SPACING;

                const offset = distance - targetDistance;

                curr.x += (dx / distance) * offset;
                curr.y += (dy / distance) * offset;
            }
        }

        /* ===============================
           DRAW
        =============================== */
        function drawDragon() {
            for (let i = parts.length - 1; i >= 0; i--) {
                const part = parts[i];
                const config = STRUCTURE[i];
                const img = images[config.type as keyof typeof images];

                ctx.save();
                ctx.translate(part.x, part.y);
                ctx.rotate(part.angle);
                const goingLeft = Math.cos(part.angle) < 0;

                if (goingLeft) {
                    ctx.scale(1, -1);
                }
                if (config.type === "head") {
                    const mouthOffset = config.size * 0.35; // ajuste fino aqui

                    ctx.drawImage(
                        img,
                        -config.size / 2 + mouthOffset,
                        -config.size / 2,
                        config.size,
                        config.size
                    );
                } else {
                    ctx.drawImage(
                        img,
                        -config.size / 2,
                        -config.size / 2,
                        config.size,
                        config.size
                    );
                }
                ctx.restore();
            }
        }

        /* ===============================
           ANIMATION LOOP
        =============================== */
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const targetPos = handleAutonomousMovement();
            updateHead(targetPos);
            updateBody();
            drawDragon();

            requestAnimationFrame(animate);
        }

        randomTarget();
        animate();

        /* ===============================
           CLEANUP
        =============================== */
        return () => {
            window.removeEventListener("mousemove", handleMouse);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 pointer-events-none"
        />
    );
}