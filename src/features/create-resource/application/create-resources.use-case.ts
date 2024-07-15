import { Either, errorResponse, successResponse } from '@/lib/either';
import { CreateResourceInput } from './create-resources.types';
import { CreateResourcesPorts } from './create-resources.ports';
import { createResourceInputSchema } from './create-resources.schemas';
import { UseCase } from '@/features/shared/useCase';
import { CREATE_RESOURCES_ERRORS, CREATE_RESOURCES_SUCCESS } from './create-resources.constants';
import { JSDOM } from 'jsdom';

export interface ICreateResourcesUsecase {
	createResource(input: CreateResourceInput): Promise<Either<string, string>>;
}

export const DEFAULT_IMAGE = 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/default.webp';

export class CreateResourceUsecase extends UseCase implements ICreateResourcesUsecase {
	constructor(private readonly ports: CreateResourcesPorts) {
		super();
	}

	async createResource(input: CreateResourceInput): Promise<Either<string, string>> {
		try {
			this.validateInput(input, createResourceInputSchema, CREATE_RESOURCES_ERRORS.INVALID_INPUT);

			const resourceId = crypto.randomUUID().toString();

			const { ownerId } = await this.getUserByUsername(input.username);

			const { title, description, faviconUrl } = await this.generateResourceData(input.resourceUrl);

			await this.validateResourceInputData(title, input.resourceUrl);

			await this.ports.storeResource({
				ownerId,
				resourceId,
				title,
				description,
				faviconUrl,
				imgUrl: DEFAULT_IMAGE,
				resourceUrl: input.resourceUrl,
				kinds: input.kinds,
			});

			return successResponse(CREATE_RESOURCES_SUCCESS.DEFAULT);
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : CREATE_RESOURCES_ERRORS.DEFAULT);
		}
	}

	private async getUserByUsername(username: string) {
		const byUsernameResponse = await this.ports.getUserByUsername({ username });
		if (!byUsernameResponse?.id) {
			throw new Error(CREATE_RESOURCES_ERRORS.RETRIEVING_RESOURCE_BY_TITLE);
		}

		return {
			ownerId: byUsernameResponse.id,
		};
	}

	private async validateResourceInputData(title: string, resourceUrl: string) {
		const [byTitle, byUrl] = await Promise.all([this.ports.getResourceByTitle({ title }), this.ports.getResourceByUrl({ resourceUrl })]);

		if (byUrl?.id) {
			throw new Error(CREATE_RESOURCES_ERRORS.RETRIEVING_RESOURCE_BY_URL);
		}

		if (byTitle?.id) {
			throw new Error(CREATE_RESOURCES_ERRORS.RETRIEVING_RESOURCE_BY_TITLE);
		}
	}

	private async generateResourceData(resourceUrl: string) {
		try {
			const url = new URL(resourceUrl);
			const host = url.hostname;

			const response = await fetch(resourceUrl, {
				headers: {
					Accept:
						'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
					Host: host,
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
				},
				cache: 'no-store',
			});

			const textResponse = await response.text();

			const dom = new JSDOM(textResponse);
			const document = dom.window.document;

			const title = dom.window.document.title || host;
			const description =
				document.querySelector('meta[name="description"]')?.getAttribute('content') || `Description for ${host} page not found`;
			const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]')?.getAttribute('href') || null;
			const faviconUrl = favicon ? new URL(favicon, resourceUrl).href : '';

			return { title, description, faviconUrl };
		} catch (error: unknown) {
			throw new Error(CREATE_RESOURCES_ERRORS.GENERATING_DATA);
		}
	}
}
