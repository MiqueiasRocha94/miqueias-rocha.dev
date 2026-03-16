"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "@/contexts/ChatContext";

interface ChatProps {
    isAdmin: boolean;
}

export default function Chat({ isAdmin }: ChatProps) {
    const { messages, sendMessage } = useChat();

    const [input, setInput] = useState("");
    const [showSource, setShowSource] = useState<string | null>(null);
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSend() {
        if (!input.trim()) return;

        setStarted(true);
        setLoading(true);

        try {
            await sendMessage(input, isAdmin);
            setInput("");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (messages.length > 0) {
            setStarted(true);
        }
    }, [messages.length]);

    const showWelcome = !started && !isAdmin;

    return (
        <main className="flex-1 flex flex-col items-center">
            <div className="w-full max-w-5xl px-6">
                <div className="border-b border-red-700 py-4">
                    <h1 className="text-red-500 font-semibold">
                        {isAdmin ? "Chat" : "Agente Virtual"}
                    </h1>
                </div>
            </div>

            <div className="flex-1 w-full max-w-5xl px-6 flex flex-col">
                {showWelcome && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
                        <div>
                            <h2 className="text-3xl text-red-500 font-bold mb-4">Olá 👋</h2>

                            <p className="max-w-xl text-zinc-300">
                                Meu nome é <strong>Uriel</strong>. Sou um agente virtual particular
                                de <strong>Miqueias Rocha</strong>.
                                <br />
                                <br />
                                Fui criado para responder perguntas e apresentar informações sobre
                                sua carreira, projetos, experiências e outros conteúdos relacionados
                                à sua trajetória profissional.
                                <br />
                                <br />
                                Se desejar conhecer mais sobre o trabalho, habilidades ou iniciativas
                                de Miqueias Rocha, basta fazer uma pergunta para iniciar a conversa.
                            </p>
                        </div>

                        <div className="flex w-full max-w-xl gap-3">
                            <input
                                className="flex-1 bg-black border border-red-700 p-4 rounded-full"
                                placeholder="Faca sua pergunta..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={loading}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-red-700 px-6 rounded-full hover:bg-red-600"
                                disabled={loading}
                            >
                                {loading ? "..." : "Enviar"}
                            </button>
                        </div>
                    </div>
                )}

                {!showWelcome && (
                    <>
                        <div className="flex-1 overflow-y-auto py-6 space-y-6">
                            {messages.map((msg) => (
                                <div key={msg.id}>
                                    {msg.fromUser ? (
                                        <div className="flex justify-end">
                                            <div className="bg-red-700 p-4 rounded-lg max-w-xl">
                                                {msg.text}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-start">
                                            <div className="bg-zinc-900 border border-red-700 p-4 rounded-lg max-w-2xl">
                                                <ReactMarkdown>{msg.text}</ReactMarkdown>

                                                <button
                                                    onClick={() =>
                                                        setShowSource(showSource === msg.id ? null : msg.id)
                                                    }
                                                    className="text-red-500 text-sm mt-3"
                                                >
                                                    {showSource === msg.id ? "Ocultar fonte" : "Ver texto fonte"}
                                                </button>

                                                {showSource === msg.id && (
                                                    <pre className="bg-black p-3 mt-3 text-sm overflow-x-auto border border-red-700">
                                                        {msg.text}
                                                    </pre>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-red-700 py-4">
                            <div className="flex gap-3">
                                <input
                                    className="flex-1 bg-black border border-red-700 p-3 rounded-lg"
                                    placeholder="Digite sua pergunta..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={loading}
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-red-700 px-5 rounded-lg hover:bg-red-600"
                                    disabled={loading}
                                >
                                    {loading ? "..." : "Enviar"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}