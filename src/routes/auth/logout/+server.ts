// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { redirect } from "@sveltejs/kit";

import { invalidateSession } from "#lib/server/auth.ts";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
    const token = cookies.get("session");

    if (token) {
        await invalidateSession(token);
        cookies.delete("session", { path: "/" });
    }

    throw redirect(302, "/");
};
