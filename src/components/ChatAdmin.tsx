"use client";

import {useState} from "react";
import Chat from "@/components/Chat";
import Context from "@/components/Context";
import Script from "@/components/Script";
import {useChat} from "@/contexts/ChatContext";


type Page =
    | "chatAdmin"
    | "chatVisitor"
    | "context"
    | "script"
    | "chatConfig"
    | "errors";



export default function ChatIA() {
    const [page, setPage] = useState<Page>("chatAdmin");
    const [openConfig, setOpenConfig] = useState(false);
    const {online} = useChat();


    return (
        <div className="flex h-screen bg-zinc-950 text-white">

            {/* SIDEBAR */}
            <aside className="w-72 border-r border-red-700 bg-zinc-950 flex flex-col">

                <div className="p-4 border-b border-red-700 flex items-center">
                    <h2 className="text-red-500 font-bold mr-2">ChatIA Admin</h2>
                    <span
                        className={`w-3 h-3 rounded-full ${
                            online ? "bg-green-500" : "bg-red-700"
                        }`}
                        title={online ? "Online" : "Offline"}
                    />
                </div>

                <nav className="flex-1 overflow-y-auto">
                    <SidebarItem label="Chat (Admin)" onClick={() => setPage("chatAdmin")} />
                    <SidebarItem label="Chat (Visitante)" onClick={() => setPage("chatVisitor")} />
                    <SidebarItem label="Configuração" onClick={() => setOpenConfig(!openConfig)} />

                    {openConfig && (
                        <div className="ml-4 border-l border-red-800">
                            <SidebarItem label="Contexto" onClick={() => setPage("context")} />
                            <SidebarItem label="Script" onClick={() => setPage("script")} />
                            <SidebarItem label="Configuração Chat" onClick={() => setPage("chatConfig")} />
                            <SidebarItem label="Erros" onClick={() => setPage("errors")} />
                        </div>
                    )}
                </nav>

                {/* HISTÓRICO SEMPRE VISÍVEL */}
                <div className="border-t border-red-700 p-3 overflow-y-auto h-56">
                    <h3 className="text-red-500 text-sm mb-2">Histórico</h3>
                    <ul className="text-sm space-y-2">
                        <li className="hover:text-red-500 cursor-pointer">Chat 01</li>
                        <li className="hover:text-red-500 cursor-pointer">Chat 02</li>
                    </ul>
                </div>
            </aside>

            {/* AREA PRINCIPAL */}
            <main className="flex-1">
                {page === "chatAdmin" && <Chat isAdmin={true} />}
                {page === "chatVisitor" && <Chat isAdmin={false} />}
                {page === "context" && <Context />}
                {page === "script" && <Script />}
                {page === "chatConfig" && <ChatConfigPage />}
                {page === "errors" && <ErrorPage />}
            </main>
        </div>
    );
}

function ChatConfigPage() {
    return (
        <div className="p-6">
            <h1 className="text-red-500 text-xl mb-4">Configuração do Chat</h1>
            <div className="space-y-4">
                <input
                    className="w-full bg-zinc-950 border border-red-700 p-3 text-white placeholder-gray-400"
                    placeholder="Modelo (ex: GPT-4, Llama)"
                />
                <input
                    className="w-full bg-zinc-950 border border-red-700 p-3 text-white placeholder-gray-400"
                    placeholder="API URL"
                />
            </div>
        </div>
    );
}

function ErrorPage() {
    return (
        <div className="p-6">
            <h1 className="text-red-500 text-xl mb-4">Logs de Erro</h1>
            <div className="bg-zinc-950 border border-red-700 p-4 h-96 overflow-auto text-white">
                Nenhum erro registrado
            </div>
        </div>
    );
}

function SidebarItem({
                         label,
                         onClick,
                     }: {
    label: string;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="px-4 py-3 hover:bg-zinc-900 cursor-pointer"
        >
            {label}
        </div>
    );
}