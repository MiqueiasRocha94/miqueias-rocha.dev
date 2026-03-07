import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === "production";

// export const nextConfig: NextConfig = {
//     output: "export", // força o Next.js a gerar arquivos estáticos em ./out
//     images: {
//         unoptimized: true, // desativa otimização de imagens (não suportada no Pages)
//     },
//     ...(isProd
//         ? {
//             basePath: "/miqueias-rocha.dev",
//             assetPrefix: "/miqueias-rocha.dev/",
//         }
//         : {}),
// };

const nextConfig: NextConfig = {
    output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;