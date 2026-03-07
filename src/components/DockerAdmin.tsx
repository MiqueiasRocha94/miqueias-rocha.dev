"use client";

import { useEffect, useState } from "react";

type Section = "containers" | "images" | "networks" | "volumes";

interface Container {
    Id: string;
    Names: string[];
    State: string;
    Status: string;
}


interface Image {
    Id: string;
    RepoTags: string[];
    Size: number;
}

interface Network {
    Id: string;
    Name: string;
    Driver: string;
}

interface Volume {
    Name: string;
    Driver: string;
}

export default function DockerAdmin() {
    const [activeSection, setActiveSection] =
        useState<Section>("containers");

    const [containers, setContainers] = useState<Container[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const [networks, setNetworks] = useState<Network[]>([]);
    const [volumes, setVolumes] = useState<Volume[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedContainer, setSelectedContainer] =
        useState<Container | null>(null);

    /* =========================
       FETCH FUNCTIONS
    ========================== */

    const fetchContainers = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/docker/containers");
            const data = await res.json();

            if (Array.isArray(data)) {
                setContainers(data);
            } else {
                console.error("Resposta inesperada:", data);
                setContainers([]);
                setError("Resposta inválida da API.");
            }
        } catch (err) {
            setError("Erro ao carregar containers.");
            setContainers([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchImages = async () => {
        const res = await fetch("/api/docker/images");
        const data = await res.json();
        setImages(Array.isArray(data) ? data : []);
    };

    const fetchNetworks = async () => {
        const res = await fetch("/api/docker/networks");
        const data = await res.json();
        setNetworks(Array.isArray(data) ? data : []);
    };

    const fetchVolumes = async () => {
        const res = await fetch("/api/docker/volumes");
        const data = await res.json();
        setVolumes(data?.Volumes || []);
    };

    /* =========================
       ACTIONS
    ========================== */

    const handleAction = async (
        action: string,
        containerId: string
    ) => {
        try {
            setLoading(true);

            await fetch(
                `/api/docker/container/${containerId}/action`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action }),
                }
            );

            await fetchContainers(); // refresh
        } catch {
            setError("Erro ao executar ação.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageRemove = async (id: string) => {
        await fetch(`/api/docker/image/${id}/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "remove" }),
        });
        fetchImages();
    };

    const handleNetworkRemove = async (id: string) => {
        await fetch(`/api/docker/network/${id}/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "remove" }),
        });
        fetchNetworks();
    };

    const handleVolumeRemove = async (name: string) => {
        await fetch(`/api/docker/volume/${name}/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "remove" }),
        });
        fetchVolumes();
    };

    /* =========================
       EFFECT
    ========================== */

    const [loaded, setLoaded] = useState<Record<Section, boolean>>({
        containers: false,
        images: false,
        networks: false,
        volumes: false,
    });

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);

                if (activeSection === "containers" && !loaded.containers) {
                    await fetchContainers();
                    setLoaded((prev) => ({ ...prev, containers: true }));
                }

                if (activeSection === "images" && !loaded.images) {
                    await fetchImages();
                    setLoaded((prev) => ({ ...prev, images: true }));
                }

                if (activeSection === "networks" && !loaded.networks) {
                    await fetchNetworks();
                    setLoaded((prev) => ({ ...prev, networks: true }));
                }

                if (activeSection === "volumes" && !loaded.volumes) {
                    await fetchVolumes();
                    setLoaded((prev) => ({ ...prev, volumes: true }));
                }
            } catch {
                setError("Erro ao carregar dados.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [activeSection]);

    /* =========================
       UI
    ========================== */

    const sectionButton = (id: Section, label: string) => {
        const active = activeSection === id;
        return (
            <button
                onClick={() => setActiveSection(id)}
                className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider transition border-b-2 ${
                    active
                        ? "text-red-500 border-red-600"
                        : "text-gray-400 border-transparent hover:text-red-400 hover:border-red-500"
                }`}
            >
                {label}
            </button>
        );
    };

    const renderContainers = () => {
        if (loading) return <div className="text-gray-400">Carregando...</div>;
        if (error) return <div className="text-red-500">{error}</div>;

        return (
            <div className="space-y-4">
                {containers.map((container) => (
                    <div
                        key={container.Id}
                        className="bg-zinc-900 p-4 rounded-lg border border-red-900 flex justify-between items-center"
                    >
                        <div>
                            <div className="text-red-500 font-bold">
                                {container.Names?.[0]?.replace("/", "")}
                            </div>
                            <div className="text-gray-400 text-sm">
                                {container.Status}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    handleAction("start", container.Id)
                                }
                                className="px-3 py-1 bg-green-600 text-white text-xs rounded"
                            >
                                Start
                            </button>
                            <button
                                onClick={() =>
                                    handleAction("stop", container.Id)
                                }
                                className="px-3 py-1 bg-yellow-600 text-white text-xs rounded"
                            >
                                Stop
                            </button>
                            <button
                                onClick={() =>
                                    handleAction("restart", container.Id)
                                }
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded"
                            >
                                Restart
                            </button>
                            <button
                                onClick={() =>
                                    handleAction("remove", container.Id)
                                }
                                className="px-3 py-1 bg-red-700 text-white text-xs rounded"
                            >
                                Remove
                            </button>
                            <button
                                onClick={() =>
                                    setSelectedContainer(container)
                                }
                                className="px-3 py-1 bg-zinc-700 text-white text-xs rounded"
                            >
                                Console
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderImages = () => (
        <div className="space-y-4">
            {images.map((img) => (
                <div
                    key={img.Id}
                    className="bg-zinc-900 p-4 rounded border border-red-900 flex justify-between"
                >
                    <div>
                        <div className="text-red-500 font-bold">
                            {img.RepoTags?.[0] || "untagged"}
                        </div>
                        <div className="text-gray-400 text-sm">
                            {(img.Size / 1024 / 1024).toFixed(2)} MB
                        </div>
                    </div>
                    <button
                        onClick={() => handleImageRemove(img.Id)}
                        className="px-3 py-1 bg-red-700 text-xs rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );

    const renderNetworks = () => (
        <div className="space-y-4">
            {networks.map((net) => (
                <div
                    key={net.Id}
                    className="bg-zinc-900 p-4 rounded border border-red-900 flex justify-between"
                >
                    <div>
                        <div className="text-red-500 font-bold">
                            {net.Name}
                        </div>
                        <div className="text-gray-400 text-sm">
                            Driver: {net.Driver}
                        </div>
                    </div>
                    <button
                        onClick={() => handleNetworkRemove(net.Id)}
                        className="px-3 py-1 bg-red-700 text-xs rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );

    const renderVolumes = () => (
        <div className="space-y-4">
            {volumes.map((vol) => (
                <div
                    key={vol.Name}
                    className="bg-zinc-900 p-4 rounded border border-red-900 flex justify-between"
                >
                    <div>
                        <div className="text-red-500 font-bold">
                            {vol.Name}
                        </div>
                        <div className="text-gray-400 text-sm">
                            Driver: {vol.Driver}
                        </div>
                    </div>
                    <button
                        onClick={() => handleVolumeRemove(vol.Name)}
                        className="px-3 py-1 bg-red-700 text-xs rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );


    return (
        <div className="bg-black border border-red-900 rounded-xl p-6 space-y-6">
            <div className="flex gap-4 border-b border-red-900 pb-2">
                {sectionButton("containers", "Containers")}
                {sectionButton("images", "Imagens")}
                {sectionButton("networks", "Networks")}
                {sectionButton("volumes", "Volumes")}
            </div>

            {loading && <div className="text-gray-400">Carregando...</div>}
            {error && <div className="text-red-500">{error}</div>}

            {!loading && activeSection === "containers" && renderContainers()}
            {!loading && activeSection === "images" && renderImages()}
            {!loading && activeSection === "networks" && renderNetworks()}
            {!loading && activeSection === "volumes" && renderVolumes()}
        </div>
    );
}