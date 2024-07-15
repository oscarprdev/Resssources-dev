import Dashboard from '@/app/components/dashboard/Dashboard';

type DashboardPageProps = {
	searchParams: {
		page: string;
	};
};

export default function DashboardPage() {
	return (
		<>
			<Dashboard />
		</>
	);
}
