import AccountAsideLink from './AccountAsideLink';
import DeleteUserModal from './modals/DeleteUserModal';
import { LinkPath } from './types';

type AccountSideProps = {
	userId: string;
};

const AccountAside = ({ userId }: AccountSideProps) => {
	return (
		<aside className="w-1/4 mr-auto flex flex-col gap-0">
			<AccountAsideLink href="/account" label="General" kind={LinkPath.DEFAULT} />
			<AccountAsideLink href="/account/profile" label="Info" kind={LinkPath.INFO} />
			<AccountAsideLink href="/account/password" label="Password" kind={LinkPath.PASSWORD} />
			<AccountAsideLink href="/account/social" label="Social links" kind={LinkPath.SOCIAL} />
			<span aria-hidden className="w-[90%] bg-zinc-100 h-[1px] my-2"></span>
			<DeleteUserModal userId={userId} />
		</aside>
	);
};

export default AccountAside;
