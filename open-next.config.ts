import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
    incrementalCache: {
        type: "kv",
    },
});
