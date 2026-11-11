/*
 * SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { InferSelectModel } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { UserRole, UserStatus } from "#lib/types/enums.ts";

import { userRole, userStatus } from "./_constants.ts";

export const User = pgTable("user", t => ({
    id: t.integer().generatedAlwaysAsIdentity().primaryKey(),

    discordId: t.varchar({ length: 32 }).unique().notNull(),
    username: t.varchar({ length: 32 }).notNull().default(""),
    avatar: t.text(),

    apiKey: t.varchar({ length: 64 }).unique().notNull(),

    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
    lastLoginAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),

    role: userRole().notNull().default(UserRole.Member),
    status: userStatus().notNull().default(UserStatus.Unverified)
}));

export type UserType = InferSelectModel<typeof User>;
