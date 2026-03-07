import { NextResponse } from "next/server";
import {
    removeImage,
    pullImage,
    inspectImage,
} from "@/services/dockerService";

export const runtime = "nodejs";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { action, image } = await req.json();
        const { id } = params;

        switch (action) {
            case "remove":
                await removeImage(id, true);
                break;

            case "inspect":
                const data = await inspectImage(id);
                return NextResponse.json(data);

            case "pull":
                if (!image) {
                    return NextResponse.json(
                        { error: "Nome da imagem é obrigatório" },
                        { status: 400 }
                    );
                }

                await pullImage(image);
                break;

            default:
                return NextResponse.json(
                    { error: "Ação inválida" },
                    { status: 400 }
                );
        }

        return NextResponse.json({ success: true });

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