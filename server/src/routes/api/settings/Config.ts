/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router } from 'express';
import * as fs from 'fs';

const router = Router();

router.get(`/`, (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(403).send(`403 Forbidden`);
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLocation = `/var/www/ShareX/configs/${((req.user as any).id as string)}.sxcu`;

    if (!fs.existsSync(fileLocation)) {
        res.status(500).send(`500 Internal Server Error`);
        return;
    }

    res.status(200).download(fileLocation);
});

export default router;
