import { EditUserAdapters } from './adapters/edit-user.adapters';
import { DefaultEditUserUsecase } from './application/edit-user.use-case';
import { DefaultEditUserInfra } from './infrastructure/edit-user.infra';
import { BucketClient } from '@/services/bucket/bucket.client';
import { PrismaUserClient } from '@/services/prisma/clients/users/prisma-user.client';

export const provideEditUserUsecase = () => {
	const userClient = new PrismaUserClient();
	const bucketClient = new BucketClient();

	const editUserInfra = new DefaultEditUserInfra(userClient, bucketClient);
	const editUserAdapters = new EditUserAdapters(editUserInfra);

	return new DefaultEditUserUsecase(editUserAdapters);
};
