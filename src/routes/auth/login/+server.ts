// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } from "$app/env/private";
import { redirect } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ cookies }) => {
    const oauthState = crypto.randomUUID();
    cookies.set("oauth_state", oauthState, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 600
    });

    const authURL = new URL("https://discord.com/oauth2/authorize");

    authURL.searchParams.set("client_id", DISCORD_CLIENT_ID);
    authURL.searchParams.set("redirect_uri", DISCORD_REDIRECT_URI);
    authURL.searchParams.set("response_type", "code");
    authURL.searchParams.set("scope", "identify");
    authURL.searchParams.set("state", oauthState);

    throw redirect(302, authURL.toString(), { external: true });
};
