import { NextResponse } from "next/server";
import {
    createNetwork,
    removeNetwork,
    inspectNetwork,
} from "@/services/dockerService";

export const runtime = "nodejs";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { action, name, driver } = await req.json();
        const { id } = params;

        switch (action) {
            case "create":
                if (!name) {
                    return NextResponse.json(
                        { error: "Nome da rede é obrigatório" },
                        { status: 400 }
                    );
                }

                const created = await createNetwork(
                    name,
                    driver ?? "bridge"
                );

                return NextResponse.json(created);

            case "inspect":
                const data = await inspectNetwork(id);
                return NextResponse.json(data);

            case "remove":
                await removeNetwork(id);
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