'use server';

import { getDashboardResourcesList } from '@/app/actions/resources/get-dashboard-resources-list';
import { columns } from './resourcesTable/columns';
import ResourceTable from './resourcesTable/ResourceTable';
import { provideDashboardListResourcesUsecase } from '@/features/dashboard';
import { isError } from '@/lib/either';
import { toast } from '../ui/use-toast';

const Dashboard = async () => {
	const listDashboardUsecase = provideDashboardListResourcesUsecase();
	const response = await getDashboardResourcesList({ usecase: listDashboardUsecase, payload: { lastResourceId: '', pageSize: 10 } });
	if (isError(response)) {
		toast({
			variant: 'destructive',
			description: response.error,
		});
	}

	return (
		<div className='container mx-auto py-10'>
			<ResourceTable
				columns={columns}
				data={!isError(response) ? response.success : []}
			/>
		</div>
	);
};

export default Dashboard;
