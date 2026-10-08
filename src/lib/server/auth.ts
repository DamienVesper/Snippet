// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { eq } from "drizzle-orm";

import { db } from "#lib/server/db.ts";
import { Session, type SessionType } from "#lib/server/models/Session.ts";
import { User, type UserType } from "#lib/server/models/User.ts";
import { helpers } from "#lib/utils/helpers.ts";

/**
 * Create a session for a given user ID.
 * @param token The user's access token.
 * @param userId The user's ID.
 */
export async function createSession(token: string, userId: UserType["id"]): Promise<SessionType> {
    const [session] = await db
        .insert(Session)
        .values({
            id: await helpers.hashString(token),
            userId,
            expiresAt: new Date(Date.now() + 30 * 864e5)
        })
        .returning();

    return session;
}

/**
 * Generate a token with optional length.
 * @param length The length of the token, in bytes. Default `32`.
 */
export function generateToken(length = 32): string {
    return crypto.getRandomValues(new Uint8Array(length)).toBase64({
        alphabet: "base64url",
        omitPadding: true
    });
}

/**
 * Validate a session.
 * @param token The token to validate.
 */
export async function validateSession(
    token: string
): Promise<{ session: SessionType; user: UserType } | { session: null; user: null }> {
    const sessionId = await helpers.hashString(token);
    const emptySession = { session: null, user: null };

    const res = await db
        .select({ session: Session, user: User })
        .from(Session)
        .innerJoin(User, eq(User.id, Session.userId))
        .where(eq(Session.id, sessionId));

    if (res.length === 0) return emptySession;

    const { session, user } = res[0];
    if (Date.now() >= session.expiresAt.getTime()) {
        await db.delete(Session).where(eq(Session.id, session.id));
        return emptySession;
    }

    if (Date.now() >= session.expiresAt.getTime() - 15 * 864e5) {
        session.expiresAt = new Date(Date.now() + 30 * 864e5);
        await db.update(Session).set({ expiresAt: session.expiresAt }).where(eq(Session.id, session.id));
    }

    return { session, user };
}

/**
 * Invalidate a session.
 * @param token The token to invalidate.
 */
export async function invalidateSession(token: string): Promise<void> {
    await db.delete(Session).where(eq(Session.id, await helpers.hashString(token)));
}
