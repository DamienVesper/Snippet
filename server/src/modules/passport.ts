import config from '../../config/config';

import passport from 'passport';

import { Strategy as DiscordStrategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

import { User } from '../models/user.model';
import { createID } from '@boatgame-io/id-utils';

const discordStrategy = new DiscordStrategy({
    clientID: (process.env.CLIENT_ID as string),
    clientSecret: (process.env.CLIENT_SECRET as string),
    callbackURL: `${config.baseURL}/auth/discord`,
    scope: [`identify`, `email`]
}, (accessToken: string, refreshToken: string, profile: DiscordStrategy.Profile, callback: VerifyCallback) => {
    void User.findOne({ discordID: profile.id }).then(userExists => {
        if (userExists !== null) return callback(null, userExists);
        void User.findOne({ username: profile.username }).then(userExists => {
            if (userExists !== null) return callback(null, userExists);

            const user = new User({
                created: new Date(),
                id: createID(),

                rank: `USER`,

                username: profile.username,
                email: profile.email,
                discordID: profile.id,
                avatarURL: profile.avatar
            });

            void user.save((err) => {
                if (err != null) return callback(err);
                else return callback(err, user);
            });
        });
    });
});

passport.use(discordStrategy);

passport.serializeUser((user, callback) => {
    callback(null, user);
});

passport.deserializeUser((id, callback) => {
    void User.findById(id, (err: unknown, user: typeof User) => {
        callback(err, user);
    });
});

export default passport;
