"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
    id: number;
    text: string;
    fromUser: boolean;
    time: string;
}

interface Props {
    messages: Message[];
    onSend: (msg: string) => void;
}

export default function ChatWoot({ messages, onSend }: Props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");

    const chatRef = useRef<HTMLDivElement>(null);

    function toggle() {
        setOpen((v) => !v);
    }

    function send() {
        if (!input.trim()) return;
        onSend(input);
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

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">

            {/* BOTÃO FLUTUANTE */}
            {!open && (
                <button
                    onClick={toggle}
                    className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                >
                    💬
                </button>
            )}

            {/* CHAT */}
            <div
                className={`w-80 h-[420px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300
        ${open ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}
        `}
            >

                {/* HEADER */}
                <div className="flex items-center justify-between px-4 py-3 text-white font-semibold bg-gradient-to-b from-red-500 to-red-800">
                    <span>Agente Virtual</span>

                    <button
                        onClick={toggle}
                        className="text-xl hover:scale-110 transition"
                    >
                        ×
                    </button>
                </div>

                {/* STATUS */}
                <div className="px-3 text-xs text-green-500">online</div>

                {/* MENSAGENS */}
                <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50"
                >
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex flex-col ${
                                msg.fromUser ? "items-end" : "items-start"
                            }`}
                        >
                            <div
                                className={`px-3 py-2 rounded-xl max-w-[75%] text-sm
                ${
                                    msg.fromUser
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                {msg.text}
                            </div>

                            <span className="text-[10px] text-gray-500 mt-1">
                {msg.time}
              </span>
                        </div>
                    ))}
                </div>

                {/* INPUT */}
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
        </div>
    );
}