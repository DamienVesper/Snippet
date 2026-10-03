// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { Router } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../../config/config";
import log from "../../utils/log";

const router = Router();

router.get(`/`, (req, res) => {
    if (req.headers.host === undefined) {
        res.status(400);
        return;
    }

    log(`magenta`, `[AUTH]: "${(req.user as any).username as string}" logged in.`);

    res.redirect(`${req.headers.host.includes(`localhost`) ? `http://localhost:3000` : config.domain}/dashboard`);
});

export default router;
