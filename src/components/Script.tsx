import { useEffect, useState } from "react";
import { httpChat } from "@/services/api";
import MarkdownTextArea from "@/components/MarkdownTextArea";
import {mode} from "d3-array";

interface Prompt {
    id?: number;
    command: string;
    model: string;
    ativo: boolean;
}

interface Model {
    name: string;
}

export default function Script() {
    const [models, setModels] = useState<Model[]>([]);
    const [modeSlected, setModeSelected] = useState<"live" | "preview">("preview");
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [formPrompt, setFormPrompt] = useState<Prompt>({
        command: "",
        model: "",
        ativo: true,
    });

    const fetchModels = async () => {
        try {
            const response = await httpChat.get("/model");
            setModels(response.data);
        } catch (err) {
            console.error("Erro ao carregar modelos:", err);
        }
    };

    const fetchPrompts = async () => {
        try {
            const response = await httpChat.get(`/admin/list/prompt/AgentAI`);

            const data = response.data;

            if (Array.isArray(data)) {
                setPrompts(data);
                if (data.length === 1) {
                    setFormPrompt(data[0]);
                }
            } else {
                setPrompts([data]);
                setFormPrompt(data);
            }

        } catch (err) {
            console.error("Erro ao carregar prompts:", err);
        }
    };

    const savePrompt = async () => {
        try {
            await httpChat.post("/admin/prompt", formPrompt);
            fetchPrompts();
        } catch (err) {
            console.error("Erro ao salvar prompt:", err);
        }
    };

    const newPrompt = () => {
        setFormPrompt({
            command: "",
            model: "",
            ativo: true,
        });
    };

    const editPrompt = (p: Prompt) => {
        setFormPrompt(p);
    };

    function changeMode() {
        setModeSelected((prev) => (prev === "live" ? "preview" : "live"));
    }

    const renderModel = () => {
        if (modeSlected === "live") {
            return (
                <select
                    className="w-full bg-zinc-950 border border-red-700 p-3 text-white mb-4"
                    value={formPrompt.model}
                    onChange={(e) =>
                        setFormPrompt({ ...formPrompt, model: e.target.value })
                    }
                >
                    <option value="">Selecione um modelo</option>

                    {models.map((m, id) => (
                        <option key={id} value={m.name}>
                            {m.name}
                        </option>
                    ))}
                </select>
            );
        }
        return (
            <input
                type="text"
                placeholder="Modelo"
                readOnly={true}
                className="w-full bg-zinc-950 border border-red-700 p-3 text-white mb-4"
                value={formPrompt.model}
            />
        );
    }

    useEffect(() => {
        fetchPrompts();
        fetchModels();
    }, []);

    return (
        <div className="flex h-screen">

            {/* Lista lateral */}
            {prompts.length > 1 && (
                <div className="w-64 border-r border-red-700 p-4 bg-zinc-950">
                    <h2 className="text-red-500 mb-3">Prompts</h2>

                    <ul className="space-y-2">
                        {prompts.map((p) => (
                            <li
                                key={p.id}
                                onClick={() => editPrompt(p)}
                                className="cursor-pointer bg-zinc-900 p-2 border border-red-700 hover:bg-zinc-800"
                            >
                                {p.command}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Área principal */}
            <div className="flex flex-col flex-1 h-full">

                {/* Conteúdo superior */}
            <div className="p-6 flex flex-col flex-1 overflow-hidden">

                    <h1 className="text-red-500 text-xl mb-4">Script da IA</h1>
                    {renderModel()}


                    {/* Editor com scroll */}
                    <div className="flex-1 overflow-auto">
                        <MarkdownTextArea
                            className="w-full h-full"
                            placeholder="Prompt da IA (.md permitido)"
                            value={formPrompt.command}
                            mode={modeSlected}
                            onChange={(value) =>
                                setFormPrompt({ ...formPrompt, command: value })
                            }
                        />
                    </div>

                </div>

                {/* Footer fixo */}
                <div className="mr-12 flex-shrink-0 border-t border-red-700 p-4 flex justify-between items-center bg-zinc-950">

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            readOnly={true}
                            checked={formPrompt.ativo}
                        />
                        <span>Ativo</span>
                    </label>

                    <div className="flex space-x-2">

                        <button
                            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                            onClick={newPrompt}
                        >
                            Novo
                        </button>

                        {modeSlected === "live" && (
                            <button
                                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                                onClick={savePrompt}
                            >
                                {formPrompt?.id ? "Atualizar " : "Salvar"}
                            </button>
                        )}

                        <button
                            className={
                                modeSlected === "live"
                                    ? "bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                                    : "bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
                            }
                            onClick={changeMode}
                        >
                            {modeSlected === "live" ? "Cancelar" : "Editar"}
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}