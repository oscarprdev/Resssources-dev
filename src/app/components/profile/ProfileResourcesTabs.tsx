import { Tabs, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ResourceType } from '@/features/shared/types/global.types';

type ProfileResourcesTabsProps = {
	handleTabSelect: (value: ResourceType) => void;
};

const ProfileResourcesTabs = ({ handleTabSelect }: ProfileResourcesTabsProps) => {
	return (
		<Tabs defaultValue="shared" className="w-[400px]" onValueChange={e => handleTabSelect(e as ResourceType)}>
			<TabsList className="grid w-full grid-cols-2 gap-2">
				<TabsTrigger value={ResourceType.SHARED}>Shared</TabsTrigger>
				<TabsTrigger value={ResourceType.FAVOURITES}>Favourites</TabsTrigger>
			</TabsList>
		</Tabs>
	);
};

export default ProfileResourcesTabs;
