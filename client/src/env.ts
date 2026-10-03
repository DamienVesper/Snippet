// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { defineEnvVars } from "@sveltejs/kit/env";
import { z } from "zod";

import pkg from "../../package.json" with { type: "json" };

export const variables = defineEnvVars({
    APP_VERSION: {
        description: "The application version.",
        public: true,
        schema: z.string().default(pkg.version),
        static: true
    }
});
