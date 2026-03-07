import { NextRequest } from "next/server";
import http from "http";
import os from "os";

export const runtime = "nodejs";

function getSocketPath() {
    return os.platform() === "win32"
        ? "//./pipe/docker_engine"
        : "/var/run/docker.sock";
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {

    const stream = new ReadableStream({
        start(controller) {

            const request = http.request({
                socketPath: getSocketPath(),
                path: `/containers/${params.id}/logs?stdout=1&stderr=1&follow=1`,
                method: "GET",
            }, (res) => {

                res.on("data", (chunk) => {
                    controller.enqueue(chunk);
                });

                res.on("end", () => {
                    controller.close();
                });
            });

            request.on("error", (err) => {
                controller.error(err);
            });

            request.end();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}