import { NextResponse } from "next/server";
import {
    startContainer,
    stopContainer,
    restartContainer,
    removeContainer,
} from "@/services/dockerService";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { action } = await req.json();
    const { id } = params;

    try {
        switch (action) {
            case "start":
                await startContainer(id);
                break;
            case "stop":
                await stopContainer(id);
                break;
            case "restart":
                await restartContainer(id);
                break;
            case "remove":
                await removeContainer(id);
                break;
            default:
                return NextResponse.json(
                    { error: "Ação inválida" },
                    { status: 400 }
                );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao executar ação" },
            { status: 500 }
        );
    }
}