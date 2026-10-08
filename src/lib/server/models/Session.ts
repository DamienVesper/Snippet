// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { pgTable } from "drizzle-orm/pg-core";

import { User } from "./User.ts";

import type { InferSelectModel } from "drizzle-orm";

export const Session = pgTable("session", t => ({
    id: t.text().primaryKey(),
    userId: t
        .integer()
        .notNull()
        .references(() => User.id, { onDelete: "cascade" }),
    expiresAt: t.timestamp({ withTimezone: true }).notNull()
}));

export type SessionType = InferSelectModel<typeof Session>;
