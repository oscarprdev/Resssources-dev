import Account from '@/app/components/account/Account';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return <Account>{children}</Account>;
}
