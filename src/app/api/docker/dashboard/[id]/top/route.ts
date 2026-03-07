import { NextResponse } from "next/server";
import { getContainerTop } from "@/services/dockerService";

export const runtime = "nodejs";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {

        const data = await getContainerTop(params.id);

        return NextResponse.json(data);

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