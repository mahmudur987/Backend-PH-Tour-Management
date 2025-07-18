/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import passport, { Profile } from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVariables } from "./env.config";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
          return done(null, false, { message: "user not exist" });
        }
        const isGoogleAuthenticate = isUserExist.auths?.some(
          (providerObject) => providerObject.provider === "google"
        );
        if (isGoogleAuthenticate) {
          return done(null, false, {
            message:
              "you should login by google and set password for credential",
          });
        }

        const isPasswordMatch = await bcrypt.compare(
          password as string,
          isUserExist.password as string
        );

        if (!isPasswordMatch) {
          return done(null, false, { message: "password not match" });
        }

        return done(null, isUserExist);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: envVariables.GOOGLE_CLIENT_ID,
      clientSecret: envVariables.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile?.emails?.[0]?.value;

        if (!email) {
          return done(null, false, { message: "No email found" });
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }

        return done(null, user);
      } catch (err) {
        console.error("google strategy Error", err);
        done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});
