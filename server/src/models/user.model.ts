import Mongoose from 'mongoose';
import { Snowflake } from '@boatgame-io/id-utils';

interface UserDoc extends Mongoose.Document {
    created: Date
    id: Snowflake

    banned: boolean
    rank: `USER` | `VIP` | `ADMIN`

    username: string
    email: string
    discordID: string
    avatarURL?: string
}

const UserSchema = new Mongoose.Schema({
    created: { type: Date, required: true },
    id: { type: String, required: true, unique: true },

    banned: { type: Boolean, required: false, default: true },
    rank: { type: String, required: false, default: `USER` },

    username: { type: String, required: true, maxlength: 32, unique: true },
    email: { type: String, required: true, unique: true },
    discordID: { type: String, required: true, unique: true },
    avatarURL: { type: String, required: false }
});

const User = Mongoose.model<UserDoc>(`User`, UserSchema);

export {
    User,
    UserDoc
};
