// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { fail } from "@sveltejs/kit";
import { count, eq } from "drizzle-orm";

import { db } from "#lib/server/db.ts";
import { Media } from "#lib/server/models/Media.ts";
import { User } from "#lib/server/models/User.ts";
import { Status } from "#lib/types/enums.ts";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const users = await db
        .select({
            avatar: User.avatar,
            discordId: User.discordId,
            role: User.role,
            status: User.status,
            username: User.username,
            createdAt: User.createdAt,
            lastLoginAt: User.lastLoginAt,
            uploads: count(Media.id)
        })
        .from(User)
        .leftJoin(Media, eq(User.id, Media.userId))
        .groupBy(User.id);

    return { users };
};

export const actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();

        const target = formData.get("target") as string | null;
        if (!target) return fail(400, { target, missing: true });

        // Currently, do nothing.
        return { success: true };
    },
    suspend: async ({ request }) => {
        const formData = await request.formData();

        const target = formData.get("target") as string | null;
        if (!target) return fail(400, { target, missing: true });

        await db.update(User).set({ status: Status.Suspended }).where(eq(User.discordId, target));

        return { success: true };
    },
    verify: async ({ request }) => {
        const formData = await request.formData();

        const target = formData.get("target") as string | null;
        if (!target) return fail(400, { target, missing: true });

        await db.update(User).set({ status: Status.Verified }).where(eq(User.discordId, target));

        return { success: true };
    }
};
