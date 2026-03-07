import { NextResponse } from "next/server";
import {listVolumes} from "@/services/dockerService";

export async function GET() {
    try {
        const volumes = await listVolumes();
        return NextResponse.json(volumes);
    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Erro desconhecido";

        return NextResponse.json(
            { error: `Erro ao listar volumes: ${message}` },
            { status: 500 }
        );
    }
}