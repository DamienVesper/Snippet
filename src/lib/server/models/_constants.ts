// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { pgEnum } from "drizzle-orm/pg-core";

export enum Role {
    Admin = "admin",
    Moderator = "mod",
    Member = "member"
}

export enum Status {
    Verified = "verified",
    Unverified = "unverified",
    Suspended = "suspended",
    Banned = "banned"
}

export const roles = pgEnum("roles", Role);
export const status = pgEnum("roles", Status);
