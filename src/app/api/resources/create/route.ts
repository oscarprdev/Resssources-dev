import { provideCreateResourceUsecase } from '@/features/create-resource';
import { isError } from '@/lib/either';
import { $Enums } from '@prisma/client';
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
		const response = await createResourceUsecase.createResource({ username, resourceUrl: url, kinds });

		if (isError(response)) {
			throw new Error(response.error);
		}

		return NextResponse.json({ ok: true, response }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
