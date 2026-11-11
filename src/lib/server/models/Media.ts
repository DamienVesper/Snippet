/*
 * SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { InferSelectModel } from "drizzle-orm";
import { index, pgTable } from "drizzle-orm/pg-core";

import { User } from "./User.ts";

export const Media = pgTable(
    "media",
    t => ({
        id: t.integer().generatedAlwaysAsIdentity().primaryKey(),

        name: t.text().notNull(),
        filename: t.text().notNull().unique(),
        mimeType: t.text().notNull().default("application/octet-stream"),
        size: t.bigint({ mode: "number" }).notNull(),

        userId: t
            .integer()
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
        createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow()
    }),
    t => [index().on(t.userId)]
);

export type MediaType = InferSelectModel<typeof Media>;
