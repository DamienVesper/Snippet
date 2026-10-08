// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { pgTable } from "drizzle-orm/pg-core";

import { User } from "./User.ts";

import type { InferSelectModel } from "drizzle-orm";

export const Media = pgTable("media", t => ({
    id: t.serial().primaryKey(),
    filename: t.text().notNull().unique(),
    size: t.integer().notNull(),

    userId: t
        .integer()
        .notNull()
        .references(() => User.id, { onDelete: "cascade" }),
    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow()
}));

export type MediaType = InferSelectModel<typeof Media>;
