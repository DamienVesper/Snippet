// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { DeepPartial } from "#lib/utils/util.ts";

export interface Config {
    /**
     * Vite dev server configuration.
     */
    vite: {
        /**
         * The network interface(s) to bind to. `0.0.0.0` binds to all interfaces.
         * @default "127.0.0.1"
         */
        host: string;
        /**
         * The port to run the dev server on.
         * @default 3000
         */
        port: number;
    };

    /**
     * Logging configuration.
     */
    logging: {
        /**
         * Whether to log the current timestamp. Useful to disable if a timestamp is already prepended to logs (i.e.
         * `journalctl`).
         */
        timestamp: boolean;
        /**
         * Whether to log informative messages.
         * @default true
         */
        info: boolean;
        /**
         * Whether to log `debug` information. Default enabled on development, disabled otherwise.
         */
        debug: boolean;
        /**
         * Whether to log warnings.
         * @default true
         */
        warn: boolean;
        /**
         * Whether to log errors. In production, these are sent to the server / client webhooks if available.
         * @default true
         */
        error: boolean;
        /**
         * Webhook to log client errors.
         */
        clientWebhook?: string;
        /**
         * Webhook to log server errors.
         */
        serverWebhook?: string;
    };
    /**
     * PostgreSQL database for account storage.
     */
    database: {
        /**
         * Whether to enable database support. Disabling this will cause all database-related API routes to return a `503`.
         * @default false
         */
        enabled: boolean;
        /**
         * @default "127.0.0.1"
         */
        host: string;
        /**
         * @default "snippet"
         */
        user: string;
        /**
         * @default "snippet"
         */
        password: string;
        /**
         * @default "snippet"
         */
        database: string;
        /**
         * @default 5432
         */
        port: number;
    };
    auth: {
        discord: {
            /**
             * The client ID of the Discord application used for OAuth.
             */
            clientId: string;
            /**
             * The client secret of the Discord application used for OAuth.
             */
            clientSecret: string;
            /**
             * The redirect URI for the Discord application in OAuth flow.
             */
            redirectURI: string;
        };
    };
    media: {
        /**
         * The origin of this site.
         * @example `https://example.domain.tld`
         */
        origin: string;
        /**
         * Where media is stored on your physical server.
         */
        storageDir: string;
    };
    /**
     * Secrets
     */
    secrets: Record<never, never>;
}

export type PartialConfig = DeepPartial<Config>;
