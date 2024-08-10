import AccountAsideLink from './AccountAsideLink';
import AccountAsideSelect from './AccountAsideSelect';
import DeleteUserModal from './modals/DeleteUserModal';
import { LinkPath } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

type AccountSideProps = {
	userId: string;
};

const AccountAside = ({ userId }: AccountSideProps) => {
	return (
		<>
			<aside className="hidden sm:flex sm:flex-col gap-0 mr-auto sm:w-1/4">
				<AccountAsideLink href="/account" label="General" kind={LinkPath.DEFAULT} />
				<AccountAsideLink href="/account/profile" label="Info" kind={LinkPath.INFO} />
				<AccountAsideLink href="/account/password" label="Password" kind={LinkPath.PASSWORD} />
				<AccountAsideLink href="/account/social" label="Social links" kind={LinkPath.SOCIAL} />
				<span aria-hidden className="w-[90%] bg-zinc-100 h-[1px] my-2"></span>
				<DeleteUserModal userId={userId} />
			</aside>
			<div className="sm:hidden w-[90vw] z-20">
				<AccountAsideSelect />
			</div>
		</>
	);
};

export default AccountAside;
