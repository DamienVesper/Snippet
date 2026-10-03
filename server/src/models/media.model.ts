// SPDX-FileCopyrightText: 2026 Damien Vesper <ldamienvesper@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { Snowflake } from "@boatgame-io/id-utils";
import Mongoose from "mongoose";

interface MediaDoc extends Mongoose.Document {
    created: Date;
    id: Snowflake;

    author: Snowflake;

    name: string;
    extension: string;
}

const MediaSchema = new Mongoose.Schema({
    created: { type: Date, required: true },
    id: { type: String, required: true, unique: true },

    author: { type: String, required: true },

    name: { type: String, required: false, unique: true },
    extension: { type: String, required: true }
});

const Media = Mongoose.model<MediaDoc>(`Media`, MediaSchema);

export { Media, MediaDoc };
