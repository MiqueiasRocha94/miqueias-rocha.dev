import http from "http";
import os from "os";

function getDockerOptions(
    method: string,
    path: string
): http.RequestOptions {

    const isWindows = os.platform() === "win32";

    if (isWindows) {
        return {
            socketPath: "//./pipe/docker_engine",
            path,
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };
    }

    // Linux / WSL
    return {
        socketPath: "/var/run/docker.sock",
        path,
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };
}

function dockerRequest(
    method: string,
    path: string,
    body?: any
): Promise<any> {
    return new Promise((resolve, reject) => {

        const options = getDockerOptions(method, path);

        const req = http.request(options, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                try {
                    resolve(data ? JSON.parse(data) : {});
                } catch {
                    resolve(data);
                }
            });
        });

        req.on("error", reject);

        if (body) {
            req.write(JSON.stringify(body));
        }

        req.end();
    });
}

export async function listContainers(all = true) {
    return dockerRequest(
        "GET",
        `/containers/json?all=${all ? 1 : 0}`
    );
}

export async function startContainer(id: string) {
    return dockerRequest("POST", `/containers/${id}/start`);
}

export async function stopContainer(id: string) {
    return dockerRequest("POST", `/containers/${id}/stop`);
}

export async function restartContainer(id: string) {
    return dockerRequest("POST", `/containers/${id}/restart`);
}

export async function removeContainer(id: string) {
    return dockerRequest(
        "DELETE",
        `/containers/${id}?force=true`
    );
}

export async function listImages() {
    return dockerRequest("GET", `/images/json`);
}


export async function inspectImage(id: string) {
    return dockerRequest("GET", `/images/${id}/json`);
}

export async function pullImage(image: string) {
    return dockerRequest(
        "POST",
        `/images/create?fromImage=${encodeURIComponent(image)}`
    );
}

export async function removeImage(id: string, force = false) {
    return dockerRequest(
        "DELETE",
        `/images/${id}?force=${force ? 1 : 0}`
    );
}

export async function listNetworks() {
    return dockerRequest("GET", `/networks`);
}

export async function createNetwork(
    name: string,
    driver = "bridge"
) {
    return dockerRequest("POST", `/networks/create`, {
        Name: name,
        Driver: driver,
    });
}

export async function inspectNetwork(id: string) {
    return dockerRequest("GET", `/networks/${id}`);
}

export async function removeNetwork(id: string) {
    return dockerRequest("DELETE", `/networks/${id}`);
}


export async function listVolumes() {
    return dockerRequest("GET", `/volumes`);
}

export async function createVolume(name: string) {
    return dockerRequest("POST", `/volumes/create`, {
        Name: name,
    });
}

export async function inspectVolume(name: string) {
    return dockerRequest("GET", `/volumes/${name}`);
}

export async function removeVolume(
    name: string,
    force = false
) {
    return dockerRequest(
        "DELETE",
        `/volumes/${name}?force=${force ? 1 : 0}`
    );
}

/* ============================
   DASHBOARD - STATS
============================ */

export async function getContainerStats(id: string) {
    const stats = await dockerRequest(
        "GET",
        `/containers/${id}/stats?stream=false`
    );

    const cpuDelta =
        stats.cpu_stats.cpu_usage.total_usage -
        stats.precpu_stats.cpu_usage.total_usage;

    const systemCpuDelta =
        stats.cpu_stats.system_cpu_usage -
        stats.precpu_stats.system_cpu_usage;

    const cpuCount =
        stats.cpu_stats.online_cpus ||
        stats.cpu_stats.cpu_usage.percpu_usage?.length ||
        1;

    let cpuPercent = 0;

    if (systemCpuDelta > 0 && cpuDelta > 0) {
        cpuPercent =
            (cpuDelta / systemCpuDelta) *
            cpuCount *
            100;
    }

    const memoryUsage = stats.memory_stats.usage || 0;
    const memoryLimit = stats.memory_stats.limit || 1;

    const memoryPercent =
        (memoryUsage / memoryLimit) * 100;

    return {
        id,
        cpuPercent,
        memoryUsage,
        memoryLimit,
        memoryPercent,
        network: stats.networks || {},
        blockIO: stats.blkio_stats || {},
    };
}

export async function getGlobalStats() {

    const containers = await listContainers(false);

    let totalCpu = 0;
    let totalMemoryUsage = 0;
    let totalMemoryLimit = 0;

    for (const container of containers) {

        const stats = await getContainerStats(container.Id);

        totalCpu += stats.cpuPercent;
        totalMemoryUsage += stats.memoryUsage;
        totalMemoryLimit += stats.memoryLimit;
    }

    const globalMemoryPercent =
        totalMemoryLimit > 0
            ? (totalMemoryUsage / totalMemoryLimit) * 100
            : 0;

    return {
        runningContainers: containers.length,
        totalCpuPercent: totalCpu,
        totalMemoryUsage,
        totalMemoryLimit,
        totalMemoryPercent: globalMemoryPercent,
    };
}

export async function getDockerInfo() {
    return dockerRequest("GET", `/info`);
}

export async function getSystemDiskUsage() {
    return dockerRequest("GET", `/system/df`);
}

export async function getContainerTop(id: string) {
    return dockerRequest(
        "GET",
        `/containers/${id}/top`
    );
}

export async function inspectContainer(id: string) {
    return dockerRequest(
        "GET",
        `/containers/${id}/json`
    );
}