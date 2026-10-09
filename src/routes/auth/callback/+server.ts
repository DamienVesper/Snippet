// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } from "$app/env/private";
import { error, redirect } from "@sveltejs/kit";

import { createSession, generateToken } from "#lib/server/auth.ts";
import { db } from "#lib/server/db.ts";
import { User } from "#lib/server/models/User.ts";
import { helpers } from "#lib/utils/helpers.ts";

import type { RequestHandler } from "./$types";
import type { APIUser, RESTPostOAuth2AccessTokenResult } from "discord-api-types/v10";

export const GET: RequestHandler = async ({ url, cookies }) => {
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const stateCookie = cookies.get("oauth_state");
    cookies.delete("oauth_state", { path: "/" });

    if (!state || !code) throw error(400, "CSRF validation failed: Missing oauth state or authorization code.");
    if (state !== stateCookie) throw error(403, "CSRF validation failed: mismatched state.");

    const tokenRes = await helpers.fetchSafe<RESTPostOAuth2AccessTokenResult>(
        "https://discord.com/api/v10/oauth2/token",
        {
            method: "POST",
            body: new URLSearchParams({
                client_id: DISCORD_CLIENT_ID,
                client_secret: DISCORD_CLIENT_SECRET,
                grant_type: "authorization_code",
                code,
                redirect_uri: DISCORD_REDIRECT_URI
            }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
    );

    if (!tokenRes.ok) throw error(500, "Failed to obtain access token.");

    const userRes = await helpers.fetchSafe<APIUser>("https://discord.com/api/v10/users/@me", {
        headers: { Authorization: `Bearer ${tokenRes.data.access_token}` }
    });

    if (!userRes.ok) throw error(500, "Failed to complete auth flow.");

    const [dbUser] = await db
        .insert(User)
        .values({
            discordId: userRes.data.id,
            username: userRes.data.username,
            avatar: userRes.data.avatar,
            apiKey: generateToken()
        })
        .onConflictDoUpdate({
            target: User.discordId,
            set: {
                username: userRes.data.username,
                avatar: userRes.data.avatar,
                lastLoginAt: new Date()
            }
        })
        .returning();

    const token = generateToken();
    const session = await createSession(token, dbUser.id);

    cookies.set("session", token, {
        path: "/",
        expires: session.expiresAt,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });

    throw redirect(302, "/dashboard");
};
