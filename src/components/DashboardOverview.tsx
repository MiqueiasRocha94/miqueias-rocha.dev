"use client";

import { useEffect, useMemo, useState } from "react";

interface DockerDashboardResponse {
    globalStats?: {
        runningContainers: number;
        totalCpuPercent: number;
        totalMemoryUsage: number;
        totalMemoryLimit: number;
        totalMemoryPercent: number;
    };
    dockerInfo?: {
        Name?: string;
        ServerVersion?: string;
        OperatingSystem?: string;
        NCPU?: number;
        MemTotal?: number;
        Containers?: number;
        ContainersRunning?: number;
        ContainersStopped?: number;
        Images?: number;
    };
    diskUsage?: {
        LayersSize?: number;
        Images?: Array<{ Size?: number; SharedSize?: number }>;
        Containers?: Array<{ SizeRootFs?: number }>;
        Volumes?: Array<{ UsageData?: { Size?: number } }>;
    };
    error?: string;
}

interface StatItem {
    label: string;
    value: string;
    tone?: "primary" | "accent" | "muted";
}

function formatBytes(bytes?: number) {
    if (!bytes || Number.isNaN(bytes)) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex += 1;
    }
    return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function formatPercent(value?: number) {
    if (value === undefined || Number.isNaN(value)) return "0%";
    return `${value.toFixed(1)}%`;
}

function StatCard({
    title,
    subtitle,
    items,
}: {
    title: string;
    subtitle: string;
    items: StatItem[];
}) {
    const accentClass = "text-red-400";
    return (
        <div className="relative overflow-hidden rounded-2xl border border-red-900/60 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6 shadow-[0_0_20px_rgba(255,0,70,0.08)]">
            <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-red-500/10 blur-2xl" />
            <div className="absolute -left-8 -bottom-12 h-28 w-28 rounded-full bg-red-500/10 blur-2xl" />
            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-red-400/70">{subtitle}</p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-100">{title}</h3>
                </div>
                <div className={`h-10 w-10 rounded-xl border border-red-500/20 bg-black/70 ${accentClass} flex items-center justify-center text-xs font-bold`}>
                    {title.slice(0, 2).toUpperCase()}
                </div>
            </div>
            <div className="mt-6 space-y-3">
                {items.map((item) => {
                    const toneClass =
                        item.tone === "accent"
                            ? "text-red-300"
                            : item.tone === "muted"
                                ? "text-zinc-400"
                                : "text-zinc-100";
                    return (
                        <div key={item.label} className="flex items-center justify-between text-sm">
                            <span className="text-zinc-400">{item.label}</span>
                            <span className={`font-semibold ${toneClass}`}>{item.value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function DashboardOverview() {
    const [dockerData, setDockerData] = useState<DockerDashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch("/api/docker/dashboard");
                const data = (await res.json()) as DockerDashboardResponse;

                if (!res.ok || data.error) {
                    throw new Error(data.error || "Erro ao carregar dashboard Docker");
                }

                setDockerData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro ao carregar Docker");
                setDockerData(null);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const dockerStats = useMemo(() => {
        const globalStats = dockerData?.globalStats;
        const dockerInfo = dockerData?.dockerInfo;
        const diskUsage = dockerData?.diskUsage;

        const diskSize =
            diskUsage?.LayersSize ??
            (diskUsage?.Images || []).reduce((sum, img) => sum + (img.Size || 0), 0) +
            (diskUsage?.Containers || []).reduce((sum, ctr) => sum + (ctr.SizeRootFs || 0), 0) +
            (diskUsage?.Volumes || []).reduce((sum, vol) => sum + (vol.UsageData?.Size || 0), 0);

        return [
            {
                label: "Containers ativos",
                value: `${globalStats?.runningContainers ?? 0}`,
                tone: "accent" as const,
            },
            {
                label: "CPU total",
                value: formatPercent(globalStats?.totalCpuPercent),
            },
            {
                label: "Memoria usada",
                value: formatBytes(globalStats?.totalMemoryUsage),
            },
            {
                label: "Memoria total",
                value: formatBytes(globalStats?.totalMemoryLimit),
            },
            {
                label: "Disco Docker",
                value: formatBytes(diskSize),
                tone: "muted" as const,
            },
            {
                label: "Host",
                value: dockerInfo?.Name || "-",
                tone: "muted" as const,
            },
        ];
    }, [dockerData]);

    const chatStats: StatItem[] = [
        { label: "Atendimentos ativos", value: "12", tone: "accent" },
        { label: "Fila de entrada", value: "4" },
        { label: "Tempo medio", value: "18s" },
        { label: "Satisfacao", value: "96%" },
        { label: "Mensagens/dia", value: "1.2k", tone: "muted" },
        { label: "Alertas", value: "2" },
    ];

    const apacheStats: StatItem[] = [
        { label: "VirtualHosts", value: "8", tone: "accent" },
        { label: "Uptime", value: "21d 4h" },
        { label: "Req/s", value: "340" },
        { label: "Latencia", value: "120ms" },
        { label: "Erros 5xx", value: "0.4%", tone: "muted" },
        { label: "Cache hit", value: "92%" },
    ];

    const routerStats: StatItem[] = [
        { label: "Dispositivos", value: "27", tone: "accent" },
        { label: "Download", value: "620 Mbps" },
        { label: "Upload", value: "210 Mbps" },
        { label: "Latencia", value: "12ms" },
        { label: "Perda pacotes", value: "0.2%", tone: "muted" },
        { label: "Bloqueios", value: "3" },
    ];

    return (
        <section className="space-y-8">
            <div className="rounded-2xl border border-red-900/60 bg-gradient-to-r from-black via-zinc-950 to-zinc-900 p-6 shadow-[inset_0_0_40px_rgba(255,0,70,0.08)]">
                <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-[0.45em] text-red-400/70">Painel geral</p>
                    <h2 className="text-2xl font-semibold text-zinc-100">Resumo das guias</h2>
                    <p className="text-sm text-zinc-400">
                        Leitura rapida do ambiente com acentos visuais discretos inspirados em tecnologia e
                        estetica japonesa.
                    </p>
                </div>
                <div className="mt-6 grid gap-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-red-500/30 bg-black/50 px-3 py-1">
                            tempo real
                        </span>
                        <span className="rounded-full border border-red-500/30 bg-black/50 px-3 py-1">
                            minimalismo
                        </span>
                        <span className="rounded-full border border-red-500/30 bg-black/50 px-3 py-1">
                            precisao
                        </span>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="rounded-xl border border-red-900/40 bg-black/70 p-6 text-sm text-zinc-400">
                    Carregando estatisticas do Docker...
                </div>
            )}

            {error && (
                <div className="rounded-xl border border-red-900/40 bg-black/70 p-6 text-sm text-red-400">
                    {error}
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                <StatCard title="Docker" subtitle="Operacao" items={dockerStats} />
                <StatCard title="Chat" subtitle="Atendimento" items={chatStats} />
                <StatCard title="Apache" subtitle="Web" items={apacheStats} />
                <StatCard title="Roteador" subtitle="Rede" items={routerStats} />
            </div>
        </section>
    );
}
