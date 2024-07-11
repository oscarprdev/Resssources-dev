import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { $Enums } from '@prisma/client';

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
			}

			return token;
		},
		session({ session, token }) {
			if (token && session.user) {
				session.user.role = token.role as $Enums.Role;
			}

			return session;
		},
	},
	session: { strategy: 'jwt' },
	...authConfig,
});
