import { Either, errorResponse, successResponse } from '@/lib/either';
import { LoginUserInput, LoginUserOutput, RegisterUserInput } from './auth-user.types';
import { AuthUserPorts } from './auth-user.ports';
import { $Enums } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SALT } from '@/constants';
import { loginInputSchema, registerUserSchema } from './auth-user.schemas';

export interface IAuthUserUsecase {
	login(input: LoginUserInput): Promise<Either<string, LoginUserOutput>>;
	register(input: RegisterUserInput): Promise<Either<string, string>>;
}

export class AuthUserUsecase implements IAuthUserUsecase {
	constructor(private readonly ports: AuthUserPorts) {}

	async login({ username, password }: LoginUserInput) {
		try {
			if (!username || !password) return errorResponse('Missing user credentials');

			const validInput = loginInputSchema.safeParse({ username, password });
			if (validInput.error) {
				return errorResponse('Invalid credentials');
			}

			const userExist = await this.ports.getUserByUsername({ username });
			if (!userExist) return errorResponse('User does not exist');

			const passwordMatch = await bcrypt.compare(password, userExist.password);
			if (!passwordMatch) return errorResponse('Credentials are not correct');

			return successResponse({ username: userExist.username });
		} catch (e) {
			return errorResponse(e instanceof Error ? e.message : 'Error logging user');
		}
	}

	async register({ username, password, email }: RegisterUserInput) {
		try {
			if (!username || !password || !email) return errorResponse('Missing user credentials');

			const validInput = registerUserSchema.safeParse({ username, password, email });
			if (validInput.error) {
				return errorResponse('Invalid credentials');
			}

			const userAlreadyCreated = await this.ports.getUserByCredentials({ username, password });
			if (userAlreadyCreated) return errorResponse('User already registered');

			const passwordCrypted = await bcrypt.hash(password, SALT);

			const userCreatedResponse = await this.ports.createUser({ username, password: passwordCrypted, email, role: $Enums.Role.DEFAULT });

			return successResponse(userCreatedResponse.id);
		} catch (e) {
			return errorResponse(e instanceof Error ? e.message : 'Error registering user');
		}
	}
}
