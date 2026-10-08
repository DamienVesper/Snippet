// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // NNA: User is guaranteed to be logged in.
    const user = locals.user!;

    return {
        discordId: user.discordId,
        username: user.username,
        avatar: user.avatar
    };
};
