import { NextResponse } from "next/server";
import {
    getGlobalStats,
    getDockerInfo,
    getSystemDiskUsage,
} from "@/services/dockerService";

export const runtime = "nodejs";

export async function GET() {
    try {

        const [
            globalStats,
            dockerInfo,
            diskUsage
        ] = await Promise.all([
            getGlobalStats(),
            getDockerInfo(),
            getSystemDiskUsage(),
        ]);

        return NextResponse.json({
            globalStats,
            dockerInfo,
            diskUsage,
        });

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