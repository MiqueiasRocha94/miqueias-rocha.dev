"use client";

import { useState } from "react";
import DockerAdmin from "@/components/DockerAdmin";

type Tab = "dashboard" | "docker" | "apache" | "roteador";

export default function AdminTabs() {
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <div className="text-gray-300">Visão geral do sistema e métricas.</div>;
            case "docker":
                return <DockerAdmin/>;
            case "apache":
                return <div className="text-gray-300">Configurações e VirtualHosts do Apache.</div>;
            case "roteador":
                return <div className="text-gray-300">Monitoramento e configuração do roteador.</div>;
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
            {/* Tabs */}
            <div className="flex border-b border-red-900 bg-gradient-to-r from-black to-zinc-900 rounded-t-xl">
                {tabButton("dashboard", "Dashboard")}
                {tabButton("docker", "Docker")}
                {tabButton("apache", "Apache")}
                {tabButton("roteador", "Roteador")}
            </div>

            {/* Content */}
            <div className="p-8 bg-zinc-950 rounded-b-xl">
                {renderContent()}
            </div>
        </div>
    );
}