import { ResourceWithRelations } from '@/services/prisma/clients/resources/prisma-resources.types';
import { $Enums } from '@prisma/client';

export type GetResourcesListInput = {
	lastResourceId: string;
	pageSize: number;
};

