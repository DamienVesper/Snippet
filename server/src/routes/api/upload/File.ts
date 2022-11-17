/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../../config/config';

import { Router } from 'express';
import { IncomingForm } from 'formidable';
import { createID } from '@boatgame-io/id-utils';

import * as path from 'path';
import * as fs from 'fs';

import { User } from '../../../models/user.model';
import { Media } from '../../../models/media.model';

import log from '../../../utils/log';
import { string as randomString } from '../../../utils/randomizer';

const router = Router();

router.get(`/`, (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields: { key: string }, files) => {
        if (err !== undefined && err !== null) {
            throw err;
        }

        if (files === undefined) {
            res.status(400).send(`400 Bad Request`);
            return;
        }

        const authKey = fields.key;

        if (fields.key === undefined) {
            res.status(400).send(`400 Bad Request`);
            return;
        }

        void User.findOne({ token: authKey }).then(user => {
            if ((user == null) || user.banned) {
                res.status(403).send(`403 Forbidden`);
                return;
            }

            const file = ((files as unknown) as { fdata: File });

            const media = new Media({
                created: new Date(),
                id: createID(),

                author: (req.user as any).id,

                name: randomString(5),
                extension: path.parse((file.fdata as any).originalFilename).ext
            });

            const fileName = `${media.name}${media.extension}`;
            void media.save()
                .then(() => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void fs.rename((file.fdata as any).filepath, path.resolve(`/var/www/ShareX/i`, fileName), () => {
                        res.status(200).send(`https://${config.domain}/i/${fileName}`);
                    });
                }).catch(err => log(`red`, err));
        });
    });
});

export default router;
