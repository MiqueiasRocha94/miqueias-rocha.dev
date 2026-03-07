import { NextResponse } from "next/server";
import { listContainers } from "@/services/dockerService";

export async function GET() {
    try {
        const containers = await listContainers(true);
        return NextResponse.json(containers);
    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Erro desconhecido";

        return NextResponse.json(
            { error: `Erro ao listar containers: ${message}` },
            { status: 500 }
        );
    }
}