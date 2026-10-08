// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { pgTable } from "drizzle-orm/pg-core";

import { Role, roles, Status, status } from "./_constants.ts";

import type { InferSelectModel } from "drizzle-orm";

export const User = pgTable("user", t => ({
    id: t.serial().primaryKey(),

    discordId: t.varchar({ length: 32 }).unique().notNull(),

    username: t.varchar({ length: 32 }).notNull().default(""),
    avatar: t.varchar({ length: 512 }),

    apiKey: t.varchar({ length: 64 }).unique().notNull(),

    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
    lastLoginAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),

    role: roles().notNull().default(Role.Member),
    status: status().notNull().default(Status.Unverified)
}));

export type UserType = InferSelectModel<typeof User>;
