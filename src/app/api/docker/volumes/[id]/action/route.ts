import { NextResponse } from "next/server";
import {
    createVolume,
    removeVolume,
    inspectVolume,
} from "@/services/dockerService";

export const runtime = "nodejs";

export async function POST(
    req: Request,
    { params }: { params: { name: string } }
) {
    try {
        const { action } = await req.json();
        const { name } = params;

        switch (action) {
            case "create":
                if (!name) {
                    return NextResponse.json(
                        { error: "Nome do volume é obrigatório" },
                        { status: 400 }
                    );
                }

                const created = await createVolume(name);
                return NextResponse.json(created);

            case "inspect":
                const data = await inspectVolume(name);
                return NextResponse.json(data);

            case "remove":
                await removeVolume(name, true);
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