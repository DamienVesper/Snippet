// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { Router } from "express";

import passport from "../../modules/passport";

const router = Router();

router.get(`/`, passport.authenticate(`discord`, { failureRedirect: `/` }), (req, res) =>
    res.redirect(`/api/auth/callback`)
);

export default router;
