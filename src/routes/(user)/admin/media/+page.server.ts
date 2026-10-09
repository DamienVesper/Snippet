// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { fail } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";

import { db } from "#lib/server/db.ts";
import { Media } from "#lib/server/models/Media.ts";
import { User } from "#lib/server/models/User.ts";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // NNA: User is guaranteed to be logged in.
    const user = locals.user!;

    const uploads = await db
        .select({
            avatar: User.avatar,
            createdAt: Media.createdAt,
            discordId: User.discordId,
            filename: Media.filename,
            name: Media.name,
            size: Media.size,
            username: User.username
        })
        .from(Media)
        .innerJoin(User, eq(Media.userId, User.id))
        .orderBy(desc(Media.createdAt))
        .limit(200);

    return {
        avatar: user.avatar,
        discordId: user.discordId,
        uploads,
        username: user.username
    };
};

export const actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();

        const target = formData.get("target") as string | null;
        if (!target) return fail(400, { target, missing: true });

        // Currently, do nothing.
        return { success: true };
    }
};
