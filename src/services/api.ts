import { createHttp } from "./httpRequest";

type ApiConfig = {
    chatUrl: string;
    securityUrl: string;
};

let configPromise: Promise<ApiConfig> | null = null;
let httpChatInstance: ReturnType<typeof createHttp> | null = null;
let httpActuatorInstance: ReturnType<typeof createHttp> | null = null;
let httpSecurityInstance: ReturnType<typeof createHttp> | null = null;

async function loadApiConfig(): Promise<ApiConfig> {
    if (configPromise) return configPromise;

    configPromise = (async () => {
        try {
            const response = await fetch("/api/config", {
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error(`Config fetch failed: ${response.status}`);
            }

            const data = (await response.json()) as ApiConfig;

            if (!data?.chatUrl || !data?.securityUrl) {
                throw new Error("Config incompleta");
            }

            return data;
        } catch {
            return {
                chatUrl: process.env.NEXT_PUBLIC_CHATURL ?? "",
                securityUrl: process.env.NEXT_PRIVATE_SECURITYURL ?? "",
            };
        }
    })();

    return configPromise;
}

export async function getHttpChat() {
    if (httpChatInstance) return httpChatInstance;
    const { chatUrl } = await loadApiConfig();
    if (!chatUrl) {
        throw new Error("CHAT_URL ausente. Configure no D1.");
    }
    httpChatInstance = createHttp(`${chatUrl}/api/v1`);
    return httpChatInstance;
}

export async function getHttpActuator() {
    if (httpActuatorInstance) return httpActuatorInstance;
    const { chatUrl } = await loadApiConfig();
    if (!chatUrl) {
        throw new Error("CHAT_URL ausente. Configure no D1.");
    }
    httpActuatorInstance = createHttp(chatUrl);
    return httpActuatorInstance;
}

export async function getHttpSecurity() {
    if (httpSecurityInstance) return httpSecurityInstance;
    const { securityUrl } = await loadApiConfig();
    if (!securityUrl) {
        throw new Error("SECURITY_URL ausente. Configure no D1.");
    }
    httpSecurityInstance = createHttp(securityUrl);
    return httpSecurityInstance;
}
