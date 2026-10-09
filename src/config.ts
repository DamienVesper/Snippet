// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { parse, stringify } from "hjson";

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { util } from "#lib/utils/util.ts";

import type { Config, PartialConfig } from "./configType.d.ts";

const CONFIG_FILENAME = "config.hjson";

const isProd = import.meta.dirname.includes("server");

export function getConfig(isProd: boolean, dir: string): Config {
    const config: Config = {
        vite: {
            host: "127.0.0.1",
            port: 3000
        },
        logging: {
            info: true,
            debug: !isProd,
            warn: true,
            error: true,
            timestamp: true
        },
        database: {
            enabled: true,
            host: "127.0.0.1",
            user: "snippet",
            password: "snippet",
            database: "snippet",
            port: 5432
        },
        auth: {
            discord: {
                clientId: "",
                clientSecret: "",
                redirectURI: ""
            }
        },
        media: {
            origin: "http://127.0.0.1:3000",
            storageDir: "/opt/Snippet/storage",
            publicDir: "/var/www/example.domain.tld/i"
        },
        secrets: {}
    };

    const configPath = join(import.meta.dirname, dir, CONFIG_FILENAME);

    let localConfig: PartialConfig = {};

    if (existsSync(configPath)) {
        console.log(`Sourcing config ${configPath}...`);
        const configText = readFileSync(configPath, "utf-8");
        localConfig = parse(configText);
        console.log("Config file read succesfully.");
    } else {
        console.log("Config file doesn't exist, creating...");
        localConfig = {
            ...config
            // NOTE: This is present if dynamic properties are to be added to the config.
            // They would be generated here. As of right now, however, there are none.
        };

        writeFileSync(configPath, stringify(localConfig, { bracesSameLine: true }));
        console.log("Config file created.");
    }

    util.mergeDeep(config, localConfig);

    return config;
}

export function saveConfig(dir: string, config: PartialConfig): void {
    try {
        const configPath = join(import.meta.dirname, dir, CONFIG_FILENAME);
        const configText = readFileSync(configPath, "utf-8");
        const localConfig = parse(configText);

        const finalConfig = util.mergeDeep({}, localConfig, config);

        writeFileSync(configPath, stringify(finalConfig, { bracesSameLine: true }));
        console.log("Saved config file.");
    } catch (err) {
        console.error("Failed to save config:", err);
    }
}

export const config = getConfig(isProd, isProd ? "../../../" : "../");
