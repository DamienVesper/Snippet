// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { desc, eq } from "drizzle-orm";

import { db } from "#lib/server/db.ts";
import { Media } from "#lib/server/models/Media.ts";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // NNA: User is guaranteed to be logged in.
    const user = locals.user!;

    const uploads = await db
        .select({
            createdAt: Media.createdAt,
            filename: Media.filename,
            name: Media.name,
            size: Media.size
        })
        .from(Media)
        .where(eq(Media.userId, user.id))
        .orderBy(desc(Media.createdAt))
        .limit(200);

    return {
        avatar: user.avatar,
        discordId: user.discordId,
        uploads,
        username: user.username
    };
};
