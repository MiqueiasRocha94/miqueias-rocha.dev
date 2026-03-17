import type { NextConfig } from "next";

const isWorkers =
    process.env.OPEN_NEXT_RUNTIME === "edge" ||
    process.env.NEXT_RUNTIME === "edge" ||
    process.env.CF_WORKER === "1";

const nextConfig: NextConfig = {
    ...(isWorkers
        ? {
              images: {
                  unoptimized: true,
              },
          }
        : {}),
    typescript: {
        ignoreBuildErrors: true, // ?? ignora todos os erros de TS durante o build
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
