import { provideCreateResourceUsecase } from '@/features/resources/create';
import { isError } from '@/lib/either';
import { $Enums } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export interface CreateResourceInput {
	url: string;
	kinds: $Enums.Kind[];
	username: string;
}

export async function POST(request: NextRequest) {
	try {
		const { url, kinds, username }: CreateResourceInput = await request.json();

		const createResourceUsecase = provideCreateResourceUsecase();
		const response = await createResourceUsecase.createResource({
			username,
			resourceUrl: url,
			kinds,
		});

		if (isError(response)) {
			throw new Error(response.error);
		}

		revalidatePath('/dashboard');

		return NextResponse.json(response.success, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText: error instanceof Error ? error.message : 'Internal server error',
			}
		);
	}
}
