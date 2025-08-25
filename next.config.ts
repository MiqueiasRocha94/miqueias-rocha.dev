import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export", // força o Next.js a gerar arquivos estáticos em ./out
    images: {
        unoptimized: true, // desativa otimização de imagens (não suportada no Pages)
    },
    basePath: "/miqueias-rocha.dev" ,
    assetPrefix: "/miqueias-rocha.dev/",
};

export default nextConfig;
