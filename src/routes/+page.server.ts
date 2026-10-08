// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) throw redirect(302, "/dashboard");
};
