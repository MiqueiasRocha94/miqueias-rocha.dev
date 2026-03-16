import { getCloudflareContext } from "@opennextjs/cloudflare";

type AppConfig = {
    chatUrl: string;
    securityUrl: string;
};

function getFallbackConfig(): AppConfig {
    return {
        chatUrl: process.env.NEXT_PUBLIC_CHATURL ?? "",
        securityUrl: process.env.NEXT_PRIVATE_SECURITYURL ?? "",
    };
}

export async function GET() {
    const fallback = getFallbackConfig();

    try {
        const { env } = await getCloudflareContext({ async: true });
        const db = env.APP_CONFIG_D1;

        if (!db) {
            return Response.json(
                { ...fallback, source: "env" },
                { headers: { "Cache-Control": "no-store" } }
            );
        }

        const result = await db
            .prepare(
                "SELECT key, value FROM app_config WHERE key IN (?, ?)"
            )
            .bind("CHAT_URL", "SECURITY_URL")
            .all();

        const rows = result.results as Array<{
            key: string;
            value: string;
        }>;

        const fromDb = rows.reduce<Record<string, string>>(
            (acc, row) => {
                acc[row.key] = row.value;
                return acc;
            },
            {}
        );

        const config: AppConfig = {
            chatUrl: fromDb.CHAT_URL ?? fallback.chatUrl,
            securityUrl: fromDb.SECURITY_URL ?? fallback.securityUrl,
        };

        if (!config.chatUrl || !config.securityUrl) {
            return Response.json(
                {
                    error:
                        "Configuração incompleta: defina CHAT_URL e SECURITY_URL no D1 ou nas variáveis de ambiente.",
                },
                { status: 500 }
            );
        }

        return Response.json(
            { ...config, source: "d1" },
            { headers: { "Cache-Control": "no-store" } }
        );
    } catch (error) {
        console.error("Erro ao carregar config do D1:", error);
        return Response.json(
            { ...fallback, source: "env" },
            { headers: { "Cache-Control": "no-store" } }
        );
    }
}
