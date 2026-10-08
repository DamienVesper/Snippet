// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { MEDIA_DIR } from "$app/env/private";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { db } from "#lib/server/db.ts";
import { Media } from "#lib/server/models/Media.ts";
import { User } from "#lib/server/models/User.ts";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, url }) => {
    try {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader) throw error(400, "No authorization header present.");

        const authKey = authHeader.slice(7);

        const res = await db.select({ id: User.id }).from(User).where(eq(User.apiKey, authKey));
        if (res.length === 0) throw error(401, "Authorization incorrect.");

        const dbUser = res[0];

        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!(file instanceof File)) throw error(400, "No file present.");

        const ext = path.extname(file.name) || (file.type.startsWith("text/") ? ".txt" : ".png");

        // Note: While I would love to use all 8 characters, the legacy project uses 6.
        const filename = crypto.randomBytes(6).toString("base64url").slice(0, 6) + ext;

        await fs.mkdir(MEDIA_DIR, { recursive: true });

        // We upload multi-gigabyte files! Do not complain about not using arraybuffer!!!
        await fs.writeFile(path.join(MEDIA_DIR, filename), file.stream());
        await db.insert(Media).values({
            filename,
            name: file.name,
            size: file.size,
            userId: dbUser.id
        });

        return Response.json({
            status: 200,
            url: `${url.origin}/i/${filename}`
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
