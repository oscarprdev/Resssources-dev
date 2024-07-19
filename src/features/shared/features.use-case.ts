import { FEATURES_ERRORS } from './features.constants';
import { errorResponse } from '@/lib/either';
import { ZodType } from 'zod';

export class FeatureUsecase {
	constructor() {}

	protected validateInput<I>(input: I, schema: ZodType<I>, errorMessage?: string) {
		const validInput = schema.safeParse(input);
		if (validInput.error) throw new Error(errorMessage || FEATURES_ERRORS.INVALID_INPUT);
	}

	protected errorUsecaseResponse(error: unknown, defaultMessage: string) {
		return errorResponse(error instanceof Error ? error.message : defaultMessage);
	}
}
