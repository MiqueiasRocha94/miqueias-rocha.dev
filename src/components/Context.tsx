import { useEffect, useState } from "react";
import { getHttpChat } from "@/services/api";
import MarkdownTextArea from "@/components/MarkdownTextArea";

// Tipos
interface AiContext {
    id?: number;
    name: string;
    context: string;
    ativo: boolean;
}

export default function Context() {
    const [modeSlected, setModeSelected] = useState<"live" | "preview">("preview");
    const [formContext, setFormContext] = useState<AiContext>({
        name: "",
        context: "",
        ativo: true,
    });

    // Buscar contextos existentes
    const fetchContext = async () => {
        try {
            const httpChat = await getHttpChat();
            const response = await httpChat.get(`/admin/list/aicontext/AgentAI`);
            setFormContext(response.data);
        } catch (err) {
            console.error("Erro ao carregar contexto:", err);
        }
    };

    // Salvar ou atualizar contexto
    const saveContext = async () => {
        try {
            if (formContext.id) {
                const httpChat = await getHttpChat();
                await httpChat.post("/api/v1/admin/aicontext", formContext);
            } else {
                const httpChat = await getHttpChat();
                await httpChat.post("/api/v1/admin/aicontext", formContext);
            }
            setFormContext({ name: "", context: "", ativo: true });
            fetchContext();
        } catch (err) {
            console.error("Erro ao salvar contexto:", err);
        }
    };

    // Limpar formulário para criar novo
    const newContext = () => {
        setFormContext({ name: "", context: "", ativo: true });
    };

    useEffect(() => {
        fetchContext();
    }, []);

    function changeMode() {
        setModeSelected((prev) => (prev === "live" ? "preview" : "live"));
    }

    return (
        <div className="flex flex-col flex-1 h-full">
            <div className="p-6 flex flex-col flex-1 overflow-hidden">
                <h1 className="text-red-500 text-xl mb-4">Contexto da IA</h1>


                {/* Campo nome */}
                <input
                    type="text"
                    placeholder="Nome do contexto"
                    className="w-full bg-zinc-950 border border-red-700 p-3 text-white placeholder-gray-400 mb-4"
                    value={formContext?.name}
                    onChange={(e) => setFormContext({ ...formContext, name: e.target.value })}
                />

                {/* Área principal (editor) */}
                <div className="flex-1 overflow-auto">
                    <MarkdownTextArea
                        className="w-full h-full bg-zinc-950 border border-red-700 p-4 text-white placeholder-gray-400 font-mono resize-none"
                        placeholder="Definir contexto da IA (Markdown .md)"
                        value={formContext?.context}
                        mode={modeSlected}
                        onChange={(e) => setFormContext({ ...formContext, context: e })}
                    />
                </div>
            </div>
            {/* Footer */}
            <div className="mr-12 flex-shrink-0 border-t border-red-700 p-4 flex justify-between items-center bg-zinc-950">

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        readOnly={true}
                        checked={formContext.ativo}
                    />
                    <span>Ativo</span>
                </label>

                <div className="flex space-x-2">

                    <button
                        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                        onClick={newContext}
                    >
                        Novo
                    </button>

                    {modeSlected === "live" && (
                        <button
                            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                            onClick={saveContext}
                        >
                            {formContext?.id ? "Atualizar " : "Salvar"}
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
    );
}
