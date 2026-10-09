// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { pgEnum } from "drizzle-orm/pg-core";

import { Role, Status } from "#lib/types/enums.ts";

export const roles = pgEnum("user_roles", Role);
export const status = pgEnum("user_status", Status);
