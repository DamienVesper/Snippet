/*
 * SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { pgEnum } from "drizzle-orm/pg-core";

import { UserRole, UserStatus } from "#lib/types/enums.ts";

export const userRole = pgEnum("user_role", UserRole);
export const userStatus = pgEnum("user_status", UserStatus);
