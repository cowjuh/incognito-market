import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            checks: ['none'],
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    debug: true, // Enable debug mode
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token, user }) {
            session = {
                ...session,
                user: {
                    id: user.id,
                    ...session.user
                }
            }
            return session
        }
    },
    logger: {
        // Use a custom logger
        error(code, ...message) {
            console.error(code, ...message)
        },
        warn(code, ...message) {
            console.warn(code, ...message)
        },
        debug(code, ...message) {
            console.log(code, ...message)
        },
    },
};