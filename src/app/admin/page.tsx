"use client";

import { useState } from "react";
import DockerAdmin from "@/components/DockerAdmin";
import { useAuth } from "@/contexts/AuthContext";
import ChatIA from "@/components/ChatAdmin";
import DashboardOverview from "@/components/DashboardOverview";

type Tab = "dashboard" | "docker" | "apache" | "roteador" | "chat";

export default function AdminTabs() {
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");
    const { logout } = useAuth();

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardOverview />;

            case "docker":
                return <DockerAdmin />;

            case "apache":
                return <div className="text-gray-300">Configuracoes e VirtualHosts do Apache.</div>;

            case "roteador":
                return <div className="text-gray-300">Monitoramento e configuracao do roteador.</div>;

            case "chat":
                return <ChatIA />;

            default:
                return null;
        }
    };

    const tabButton = (id: Tab, label: string) => {
        const isActive = activeTab === id;

        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`px-6 py-3 font-semibold uppercase tracking-wider text-sm transition-all duration-300 border-b-2 ${
                    isActive
                        ? "text-red-500 border-red-600 bg-black"
                        : "text-gray-400 border-transparent hover:text-red-400 hover:border-red-500"
                }`}
            >
                {label}
            </button>
        );
    };

    return (
        <div className="min-h-[400px] justify-center bg-black rounded-xl shadow-2xl border border-red-900">
            <div className="flex justify-between items-center border-b border-red-900 bg-gradient-to-r from-black to-zinc-900 rounded-t-xl">
                <div className="flex">
                    {tabButton("dashboard", "Dashboard")}
                    {tabButton("docker", "Docker")}
                    {tabButton("apache", "Apache")}
                    {tabButton("roteador", "Roteador")}
                    {tabButton("chat", "Chat")}
                </div>

                <button
                    onClick={logout}
                    className="mr-4 px-4 py-2 text-sm font-bold uppercase text-black bg-red-600 rounded-md hover:bg-red-700 hover:shadow-[0_0_15px_#ff0000] transition"
                >
                    Logout
                </button>
            </div>

            <div className="p-8 bg-zinc-950 rounded-b-xl">{renderContent()}</div>
        </div>
    );
}
