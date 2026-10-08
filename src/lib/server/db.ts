// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { DATABASE_URL } from "$app/env/private";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { Logger } from "../utils/Logger.ts";

const pool = new Pool({
    connectionString: DATABASE_URL
});

const logger = new Logger();

pool.on("connect", () => {
    logger.info("PostgreSQL", "Connected to database.");
});

pool.on("error", err => {
    logger.error("PostgreSQL", err.stack ?? err.message);
});

export const db = drizzle({ client: pool });
