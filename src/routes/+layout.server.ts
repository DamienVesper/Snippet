// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => ({
    authenticated: locals.user?.id !== undefined,
    avatar: locals.user?.avatar,
    role: locals.user?.role,
    discordId: locals.user?.discordId,
    username: locals.user?.username
});
