import { $Enums } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';

interface CustomUser extends DefaultUser {
	role?: $Enums.Role;
}
declare module 'next-auth' {
	interface User extends CustomUser {}
	interface Session {
		user?: User;
	}
}
declare module 'next-auth/jwt' {
	interface JWT extends User {}
}
