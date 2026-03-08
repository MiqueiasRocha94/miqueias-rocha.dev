export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="relative">
                {/* Animação de círculos concêntricos estilo futurista */}
                <div className="absolute inset-0 rounded-full border-4 border-red-600 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border-2 border-red-500 animate-pulse"></div>
                <div className="w-16 h-16 border-4 border-red-400 rounded-full animate-spin"></div>

                {/* Texto oriental/futurista */}
                <p className="absolute inset-0 flex items-center justify-center text-red-600 font-mono text-xl tracking-widest">
                    ローディング... {/* "Loading..." em japonês */}
                </p>
            </div>
        </div>
    );
}