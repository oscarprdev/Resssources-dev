import { AuthUserPorts } from './auth-user.ports';
import { loginInputSchema, registerUserSchema } from './auth-user.schemas';
import { LoginUserInput, LoginUserOutput, RegisterUserInput } from './auth-user.types';
import { AUTH_USER_ERRORS } from './auth-user.use-case.constants';
import { SALT } from '@/constants';
import { Either, errorResponse, successResponse } from '@/lib/either';
import { $Enums } from '@prisma/client';
import bcrypt from 'bcryptjs';

export interface IAuthUserUsecase {
	login(input: LoginUserInput): Promise<Either<string, LoginUserOutput>>;
	register(input: RegisterUserInput): Promise<Either<string, string>>;
}

export class AuthUserUsecase implements IAuthUserUsecase {
	constructor(private readonly ports: AuthUserPorts) {}

	async login({ username, password }: LoginUserInput) {
		try {
			if (!username || !password) return errorResponse(AUTH_USER_ERRORS.MISSING_CREDENTIALS);

			const validInput = loginInputSchema.safeParse({ username, password });
			if (validInput.error) {
				return errorResponse(AUTH_USER_ERRORS.INVALID_CREDENTIALS);
			}

			const userExist = await this.ports.getUserByUsername({ username });
			if (!userExist) return errorResponse(AUTH_USER_ERRORS.USER_NO_EXIST);

			const passwordMatch = await bcrypt.compare(password, userExist.password);
			if (!passwordMatch) return errorResponse(AUTH_USER_ERRORS.INVALID_CREDENTIALS);

			return successResponse({
				username: userExist.username,
				role: userExist.role,
				id: userExist.id,
			});
		} catch (e) {
			return errorResponse(e instanceof Error ? e.message : AUTH_USER_ERRORS.DEFAULT_LOGIN_ERROR);
		}
	}

	async register({ username, password, email }: RegisterUserInput) {
		try {
			if (!username || !password || !email) return errorResponse(AUTH_USER_ERRORS.MISSING_CREDENTIALS);

			const validInput = registerUserSchema.safeParse({
				username,
				password,
				email,
			});
			if (validInput.error) {
				return errorResponse(AUTH_USER_ERRORS.INVALID_CREDENTIALS);
			}

			const userAlreadyCreated = await this.ports.getUserByCredentials({
				username,
				password,
			});
			if (userAlreadyCreated) return errorResponse(AUTH_USER_ERRORS.ALREADY_EXIST);

			const passwordCrypted = await bcrypt.hash(password, SALT);

			const userCreatedResponse = await this.ports.createUser({
				username,
				password: passwordCrypted,
				email,
				role: $Enums.Role.DEFAULT,
			});

			return successResponse(userCreatedResponse.id);
		} catch (e) {
			return errorResponse(e instanceof Error ? e.message : AUTH_USER_ERRORS.DEFAULT_REGISTER_ERROR);
		}
	}
}
