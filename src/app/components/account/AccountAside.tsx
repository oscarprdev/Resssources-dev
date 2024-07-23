import AccountAsideLink from './AccountAsideLink';
import { LinkPath } from './types';
import Link from 'next/link';

const AccountAside = () => {
	return (
		<aside className="w-1/4 mr-auto flex flex-col gap-0">
			<AccountAsideLink href="/account" label="General" kind={LinkPath.DEFAULT} />
			<AccountAsideLink href="/account/profile" label="Info" kind={LinkPath.INFO} />
			<AccountAsideLink href="/account/password" label="Password" kind={LinkPath.PASSWORD} />
			<AccountAsideLink href="/account/social" label="Social links" kind={LinkPath.SOCIAL} />
		</aside>
	);
};

export default AccountAside;
