// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { defineEnvVars } from "@sveltejs/kit/env";
import { z } from "zod";

import { config } from "./config.ts";

import pkg from "../package.json" with { type: "json" };

export const variables = defineEnvVars({
    APP_VERSION: {
        description: "The application version.",
        public: true,
        schema: z.string().nonoptional().default(pkg.version),
        static: true
    },
    DISCORD_CLIENT_ID: {
        description: "The client ID of the Discord application used for OAuth.",
        schema: z.string().nonoptional().default(config.auth.discord.clientId),
        static: true
    },
    DISCORD_CLIENT_SECRET: {
        description: "The client secret of the Discord application used for OAuth.",
        schema: z.string().nonoptional().default(config.auth.discord.clientSecret),
        static: true
    },
    DISCORD_REDIRECT_URI: {
        description: "The redirect URI for the Discord application in OAuth flow.",
        schema: z.url().nonoptional().default(config.auth.discord.redirectURI),
        static: true
    },
    DATABASE_URL: {
        description: "The PostgreSQL database URL for authentication and data storage.",
        schema: z
            .string()
            .nonoptional()
            .default(
                `postgresql://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.database}`
            ),
        static: true
    },
    MEDIA_STORAGE_DIR: {
        description: "The location where media files are stored on your physical server.",
        schema: z.string().nonoptional().default(config.media.storageDir),
        static: true
    },
    MEDIA_PUBLIC_DIR: {
        description: "The location where media is symlinked to on your physical server.",
        schema: z.string().nonoptional().default(config.media.publicDir),
        static: true
    },
    MEDIA_MAX_PERM_SIZE: {
        description: "The maximum file size for permanent uploads, in bytes.",
        public: true,
        schema: z.string().nonoptional().default(config.media.maxPermanentSize.toString()),
        static: true
    }
});
