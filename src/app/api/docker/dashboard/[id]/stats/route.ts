import { NextResponse } from "next/server";
import { getContainerStats } from "@/services/dockerService";

export const runtime = "nodejs";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {

        const stats = await getContainerStats(params.id);

        return NextResponse.json(stats);

    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Erro desconhecido";

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}