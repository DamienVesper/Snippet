// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { count } from "drizzle-orm";

import { db } from "#lib/server/db.ts";
import { Media } from "#lib/server/models/Media.ts";
import { User } from "#lib/server/models/User.ts";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // NNA: User is guaranteed to be logged in.
    const user = locals.user!;

    const [userCount] = await db.select({ count: count() }).from(User);
    const [mediaCount] = await db.select({ count: count() }).from(Media);

    return {
        avatar: user.avatar,
        discordId: user.discordId,
        username: user.username,
        stats: {
            users: userCount.count,
            uploads: mediaCount.count
        }
    };
};
