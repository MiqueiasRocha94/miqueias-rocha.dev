import { NextResponse } from "next/server";
import {listNetworks} from "@/services/dockerService";

export async function GET() {
    try {
        const networks = await listNetworks();
        return NextResponse.json(networks);
    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Erro desconhecido";

        return NextResponse.json(
            { error: `Erro ao listar networks: ${message}` },
            { status: 500 }
        );
    }
}