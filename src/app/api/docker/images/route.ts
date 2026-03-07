import { NextResponse } from "next/server";
import {listImages} from "@/services/dockerService";

export async function GET() {
    try {
        const images = await listImages();
        return NextResponse.json(images);
    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Erro desconhecido";

        return NextResponse.json(
            { error: `Erro ao listar images: ${message}` },
            { status: 500 }
        );
    }
}