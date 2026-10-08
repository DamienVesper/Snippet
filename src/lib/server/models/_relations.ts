import { defineRelations } from "drizzle-orm";

import { Media } from "./Media.ts";
import { Session } from "./Session.ts";
import { User } from "./User.ts";

export const relations = defineRelations({ Media, Session, User }, r => ({
    Media: {
        user: r.one.User({
            from: r.Media.userId,
            to: r.User.id
        })
    },
    Session: {
        user: r.one.User({
            from: r.Session.userId,
            to: r.User.id
        })
    },
    User: {
        media: r.many.Media(),
        sessions: r.many.Session()
    }
}));
