'use client';

import { LinkPath } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useRouter } from 'next/navigation';

const AccountAsideSelect = () => {
	const router = useRouter();

	const handleSelectChange = (value: string) => {
		const commonPath = '/account';
		switch (value) {
			case LinkPath.INFO:
				router.push(`${commonPath}/profile`);
				break;
			case LinkPath.PASSWORD:
				router.push(`${commonPath}/password`);
				break;
			case LinkPath.SOCIAL:
				router.push(`${commonPath}/social`);
				break;
			default:
				router.push(`${commonPath}`);
				break;
		}
	};

	return (
		<Select onValueChange={handleSelectChange} defaultValue={Object.values(LinkPath)[0]}>
			<SelectTrigger className="capitalize">
				<SelectValue placeholder="Select account info" />
			</SelectTrigger>
			<SelectContent className="bg-white max-h-[200px]" side="bottom">
				{Object.values(LinkPath).map(kind => (
					<SelectItem
						key={kind}
						value={kind}
						className="capitalize text-md text-zinc-400 hover:text-zinc-600">
						{kind.toLowerCase()}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default AccountAsideSelect;
