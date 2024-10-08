import authConfig from './auth.config';
import { $Enums } from '@prisma/client';
import NextAuth from 'next-auth';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.id = user.id;
			}

			return token;
		},
		session({ session, token }) {
			if (token && session.user) {
				session.user.role = token.role as $Enums.Role;
				session.user.id = token.id as string;
			}

			return session;
		},
	},
	session: { strategy: 'jwt' },
	...authConfig,
});
