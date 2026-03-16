"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@/contexts/ChatContext";

export default function ChatWoot() {
    const pathname = usePathname();
    const { messages, sendMessage, online } = useChat();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");

    const chatRef = useRef<HTMLDivElement>(null);

    function toggle() {
        setOpen((v) => !v);
    }

    function send() {
        if (!input.trim()) return;

        sendMessage(input, false);
        setInput("");
    }

    function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            send();
        }
    }

    useEffect(() => {
        if (!chatRef.current) return;
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);

    if (pathname.startsWith("/chat")) {
        return null;
    }

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            {!open && (
                <button
                    onClick={toggle}
                    className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                >
                    💬
                </button>
            )}

            {open && (
                <div className="w-80 h-[420px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-[fadeIn_.25s_ease]">
                    <div className="flex items-center justify-between px-4 py-3 text-white font-semibold bg-gradient-to-b from-red-500 to-red-800">
                        <span>Agente Virtual</span>

                        <button
                            onClick={toggle}
                            className="text-xl hover:scale-110 transition"
                        >
                            ×
                        </button>
                    </div>

                    <div className="px-3 text-xs py-1">
                        {online ? (
                            <span className="text-green-500">online</span>
                        ) : (
                            <span className="text-gray-400">offline</span>
                        )}
                    </div>

                    <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                        {messages.slice(-6).map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${msg.fromUser ? "items-end" : "items-start"}`}
                            >
                                <div
                                    className={`px-3 py-2 rounded-xl max-w-[75%] text-sm
                                    ${msg.fromUser ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"}`}
                                >
                                    {msg.text.length > 180 ? `${msg.text.slice(0, 180)}...` : msg.text}
                                </div>

                                <span className="text-[10px] text-gray-500 mt-1">{msg.time}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex border-t">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 px-3 py-2 text-sm outline-none"
                        />

                        <button
                            onClick={send}
                            className="px-4 bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
