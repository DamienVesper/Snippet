// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { error } from "@sveltejs/kit";

import ShareXConfig from "../../../../ShareX.json" with { type: "json" };
import { config } from "../../../config.ts";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) throw error(403, "User is not logged in.");
    return Response.json(
        {
            ...ShareXConfig,
            RequestURL: `${config.media.origin}/api/upload`,
            Headers: {
                Authorization: `Bearer ${locals.user.apiKey}`
            }
        },
        {
            headers: {
                "Content-Disposition": `attachment; filename=snippet-${locals.user.username}.sxcu`
            }
        }
    );
};
