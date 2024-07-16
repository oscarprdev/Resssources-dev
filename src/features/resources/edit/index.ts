import { BucketClient } from '@/services/bucket/bucket.client';
import { EditResourceUsecase } from './application/edit-resource.use-case';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';
import { PrismaResourcesClient } from '@/services/prisma/clients/resources/prisma-resources.client';
import { EditResourceClient } from './infrastructure/edit-resource.client';
import { EditResourceAdapter } from './adapters/edit-resource.adapters';

export const provideEditResourceUsecase = (): EditResourceUsecase => {
	const bucketClient = new BucketClient();
	const userClient = new PrismaUserClient();
	const resourcesClient = new PrismaResourcesClient();
	const editResourceClient = new EditResourceClient(resourcesClient, bucketClient);
	const editResourceAdapter = new EditResourceAdapter(editResourceClient);

	return new EditResourceUsecase(editResourceAdapter, userClient);
};
