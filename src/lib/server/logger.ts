// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { Logger } from "#lib/utils/Logger.ts";

import { config } from "../../config.ts";

export const logger = new Logger(config.logging);
