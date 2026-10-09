// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { redirect } from "@sveltejs/kit";
import { type Handle } from "@sveltejs/kit/hooks";

import { validateSession } from "#lib/server/auth.ts";
import { Role } from "#lib/types/enums.ts";

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
