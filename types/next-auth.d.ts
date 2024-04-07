import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User extends DefaultSession['user'] {
        id: string;
    }

    interface Session {
        user: User;
    }
}