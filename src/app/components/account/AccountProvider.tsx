'use client';

import { ReactNode, createContext } from 'react';

type AccountContext = {
	userId: string;
	email: string;
	username: string;
	description: string;
	profileImage: string;
};

export const accountContext = createContext<AccountContext | undefined>(undefined);

export const AccountProvider = ({ children, accountProps }: { children: ReactNode; accountProps: AccountContext }) => {
	return <accountContext.Provider value={{ ...accountProps }}>{children}</accountContext.Provider>;
};
