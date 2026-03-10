"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { httpActuator, httpChat } from "@/services/api";


type Message = {
    id: string;
    text: string;
    fromUser: boolean;
    time: string;
};

type ChatContextType = {
    messages: Message[];
    online: boolean;
    sendMessage: (text: string, isAdmin?: boolean) => Promise<void>;
    getModel: () => Promise<string[]>;
    embed: (text: string, queries?: string[]) => Promise<number>;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {

    const [messages, setMessages] = useState<Message[]>(() => {
        if (typeof window === "undefined") return [];

        try {
            const stored = sessionStorage.getItem("chat_messages");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [online, setOnline] = useState<boolean>(false);
    const messagesRef = useRef<Message[]>(messages);

    function getTime() {
        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function getLimit(isAdmin: boolean) {
        return isAdmin ? 50 : 10;
    }

    function trimMessages(list: Message[], limit: number) {
        if (list.length <= limit) return list;
        return list.slice(list.length - limit);
    }

    useEffect(() => {
        messagesRef.current = messages;

        sessionStorage.setItem(
            "chat_messages",
            JSON.stringify(messages)
        );
    }, [messages]);

    useEffect(() => {

        let timeout: NodeJS.Timeout;
        let failures = 0;

        const checkStatus = async () => {

            try {

                const response = await httpActuator.get("/actuator/health");

                const isUp = response.data.status === "UP";

                setOnline(isUp);

                if (isUp) {
                    failures = 0;
                    timeout = setTimeout(checkStatus, 1800000);
                } else {
                    throw new Error("service down");
                }

            } catch {

                failures++;

                let delay = 60000;

                if (failures === 2) delay = 600000;
                if (failures >= 3) delay = 1800000;

                setOnline(false);

                timeout = setTimeout(checkStatus, delay);
            }
        };

        checkStatus();

        return () => clearTimeout(timeout);

    }, []);

    async function sendMessage(text: string, isAdmin = false) {

        const limit = getLimit(isAdmin);

        if (!online) {

            const offlineMsg: Message = {
                id: crypto.randomUUID(),
                text: "Serviço temporariamente offline.",
                fromUser: false,
                time: getTime()
            };

            setMessages(prev => trimMessages([...prev, offlineMsg], limit));
            return;
        }

        const userMsg: Message = {
            id: crypto.randomUUID(),
            text: text,
            fromUser: true,
            time: getTime()
        };

        setMessages(prev => trimMessages([...prev, userMsg], limit));

        try {

            const lastAIResponse = messagesRef.current
                .filter(m => !m.fromUser)
                .map(m => m.text)
                .join("\n");

            const payload = {
                id: 0,
                ativo: true,
                name: "Uriel",
                birthDate: "2026-03-06",
                address: "",
                question: text,
                previousResponse: lastAIResponse || "",
                usertypes: isAdmin ? "admin" : "visitante",
                idSystem: 1
            };

            const response = await httpChat.post("/chat", payload);

            const aiText = response.data?.message ?? "Sem resposta da IA.";

            const aiMsg: Message = {
                id: crypto.randomUUID(),
                text: aiText,
                fromUser: false,
                time: getTime()
            };

            setMessages(prev => trimMessages([...prev, aiMsg], limit));

        } catch (error) {

            console.error(error);

            const aiMsg: Message = {
                id: crypto.randomUUID(),
                text: "Erro ao obter resposta da API.",
                fromUser: false,
                time: getTime()
            };

            setMessages(prev => trimMessages([...prev, aiMsg], limit));
        }
    }

    async function embed(text: string, queries: string[] = []): Promise<number> {

        try {

            const response = await httpChat.post("/embedding", {
                text,
                queries
            });

            return response.data?.similarity ?? 0;

        } catch (error) {

            console.error("Embedding error:", error);
            return 0;
        }
    }

    async function getModel(): Promise<string[]> {

        try {

            const response = await httpChat.get("/models");

            return response.data ?? [];

        } catch (error) {

            console.error("Get models error:", error);
            return [];
        }
    }

    return (
        <ChatContext.Provider
            value={{
                messages,
                sendMessage,
                online,
                embed,
                getModel
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error("useChat must be used inside ChatProvider");
    return ctx;
}