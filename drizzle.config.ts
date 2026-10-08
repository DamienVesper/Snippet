import { defineConfig } from "drizzle-kit";

import { getConfig } from "./src/config.ts";

const isProd = process.env.NODE_ENV === "production";
const config = getConfig(isProd, "./");

export default defineConfig({
    out: "./dist",
    schema: "./src/lib/server/models",
    dialect: "postgresql",
    dbCredentials: {
        url: `postgresql://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.database}`
    },
    verbose: true
});
