import Mongoose from 'mongoose';
import { Snowflake } from '@boatgame-io/id-utils';

interface UploadDoc extends Mongoose.Document {
    created: Date
    id: Snowflake

    author: Snowflake
}

const UploadSchema = new Mongoose.Schema({
    created: { type: Date, required: true },
    id: { type: String, required: true, unique: true },

    author: { type: String, required: true }
});

const Upload = Mongoose.model<UploadDoc>(`Upload`, UploadSchema);

export {
    Upload,
    UploadDoc
};
