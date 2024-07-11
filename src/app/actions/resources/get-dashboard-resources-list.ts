'use server';

import { IListResourcesUsecase } from '@/features/dashboard/application/list-resources/list-resources.use-case';
import { GetResourcesListInput } from '@/features/dashboard/application/list-resources/list-resources.use-case.types';

export type GetDashboardResourcesListInput = {
	usecase: IListResourcesUsecase;
	payload: GetResourcesListInput;
};

export const getDashboardResourcesList = async ({ usecase, payload }: GetDashboardResourcesListInput) => {
	return await usecase.getResources(payload);
};
