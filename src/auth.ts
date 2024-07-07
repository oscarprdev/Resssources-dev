import NextAuth, { User } from 'next-auth';
import authConfig from './auth.config';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async session({ session, token }) {
			return session;
		},
	},
	session: { strategy: 'jwt' },
	...authConfig,
});
