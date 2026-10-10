// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { MEDIA_PUBLIC_DIR, MEDIA_STORAGE_DIR } from "$app/env/private";
import { MEDIA_MAX_PERM_SIZE } from "$app/env/public";
import { redirect } from "@sveltejs/kit";
import { Cron } from "croner";
import { and, gt, lt } from "drizzle-orm";

import fs from "node:fs/promises";
import path from "node:path";

import { validateSession } from "#lib/server/auth.ts";
import { db } from "#lib/server/db.ts";
import { logger } from "#lib/server/logger.ts";
import { Media } from "#lib/server/models/Media.ts";
import { Role } from "#lib/types/enums.ts";

import type { Handle } from "@sveltejs/kit/hooks";

const hiddenPaths = ["/admin", "/dashboard", "/settings"];

export const handle: Handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get("session");

    if (!sessionToken) {
        event.locals.user = null;
        event.locals.session = null;

        for (let i = 0; i < hiddenPaths.length; ++i) {
            if (event.url.pathname.startsWith(hiddenPaths[i])) throw redirect(302, "/");
        }

        return await resolve(event);
    }

    const { session, user } = await validateSession(sessionToken);

    if (session) {
        event.cookies.set("session", sessionToken, {
            path: "/",
            expires: session.expiresAt,
            sameSite: "lax",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });

        event.locals.user = user;
        event.locals.session = session;

        if (event.url.pathname.startsWith("/admin") && event.locals.user.role !== Role.Admin) {
            throw redirect(302, "/dashboard");
        }
    } else {
        event.cookies.delete("session", { path: "/" });

        event.locals.user = null;
        event.locals.session = null;

        for (let i = 0; i < hiddenPaths.length; ++i) {
            if (event.url.pathname.startsWith(hiddenPaths[i])) throw redirect(302, "/");
        }
    }

    return await resolve(event);
};

// Try to delete old files every hour.
new Cron("0 * * * *", async () => {
    const maxAge = new Date(Date.now() - 7 * 864e5);

    const files = await db
        .delete(Media)
        .where(and(gt(Media.size, Number(MEDIA_MAX_PERM_SIZE)), lt(Media.createdAt, maxAge)))
        .returning({ createdAt: Media.createdAt, filename: Media.filename });

    if (files.length === 0) {
        logger.info("Hooks", "No temporary files to delete.");
        return;
    }

    let i = 0;
    for (const file of files) {
        try {
            await fs.unlink(path.join(MEDIA_PUBLIC_DIR, file.filename));
            await fs.unlink(
                path.join(
                    `${MEDIA_STORAGE_DIR}/${file.createdAt.getUTCFullYear()}/${file.createdAt.getUTCMonth() + 1}/${file.createdAt.getUTCDate()}`,
                    file.filename
                )
            );

            ++i;
        } catch (err) {
            logger.error("Hooks", `Failed to delete temporary file: ${file.filename}.`, err);
        }
    }

    logger.info("Hooks", `Deleted ${i} temporary files.`);
});
