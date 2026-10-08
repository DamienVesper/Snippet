import { defineRelations } from "drizzle-orm";

import { Session } from "./Session.ts";
import { User } from "./User.ts";

export const relations = defineRelations({ Session, User }, r => ({
    Session: {
        user: r.one.User({
            from: r.Session.userId,
            to: r.User.id
        })
    },
    User: {
        sessions: r.many.Session()
    }
}));
