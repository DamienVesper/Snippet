// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { MEDIA_PUBLIC_DIR, MEDIA_STORAGE_DIR } from "$app/env/private";
import { error } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { db } from "#lib/server/db.ts";
import { Media } from "#lib/server/models/Media.ts";
import { User, type UserType } from "#lib/server/models/User.ts";
import { Status } from "#lib/types/enums.ts";

import type { RequestHandler } from "./$types";

/**
 * Save a media file to storage.
 * @param userId The ID of the user to associate the media with.
 * @param request The POST request relevant to the media.
 */
async function saveFile(userId: UserType["id"], request: Request): Promise<string> {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!(file instanceof File)) throw error(400, "No file present.");

    const ext = path.extname(file.name) || (file.type.startsWith("text/") ? ".txt" : ".png");

    // Note: While I would love to use all 8 characters, the legacy project uses 6.
    const filename = crypto.randomBytes(6).toString("base64url").slice(0, 6) + ext;
    const today = new Date();

    const storageDir = `${MEDIA_STORAGE_DIR}/${today.getUTCFullYear()}/${today.getUTCMonth()}/${today.getUTCDate()}`;
    const filePath = path.join(storageDir, file.name);

    await fs.mkdir(storageDir, { recursive: true });

    // We upload multi-gigabyte files! Do not complain about not using arraybuffer!!!
    await fs.writeFile(filePath, file.stream());
    await fs.symlink(filePath, path.join(MEDIA_PUBLIC_DIR, filename), "file");

    await db.insert(Media).values({
        filename,
        name: file.name,
        size: file.size,
        userId
    });

    return filename;
}

export const POST: RequestHandler = async ({ locals, request, url }) => {
    try {
        if (locals.user) {
            return Response.json({
                status: 200,
                url: `${url.origin}/i/${await saveFile(locals.user.id, request)}`
            });
        }

        const authHeader = request.headers.get("Authorization");
        if (!authHeader) throw error(400, "No authorization header present.");

        const authKey = authHeader.slice(7);
        const res = await db
            .select({ id: User.id })
            .from(User)
            .where(and(eq(User.apiKey, authKey), eq(User.status, Status.Verified)));

        if (res.length === 0) throw error(401, "Authorization incorrect.");

        return Response.json({
            status: 200,
            url: `${url.origin}/i/${await saveFile(res[0].id, request)}`
        });
    } catch (err) {
        // TODO: Use the logger for this.
        console.error(err);

        return Response.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};
