'use client';

import { accountContext } from '../AccountProvider';
import EditUserCredentialsForm, { EditUserCredentialsFormValues } from '../forms/EditUserCredentialsForm';
import { editUserCredentialsAction } from '@/app/actions/users/edit-user-credentials.action';
import { useContext } from 'react';

const AccountPassword = () => {
	const context = useContext(accountContext);

	const handleSubmit = async ({ password, oldPassword }: EditUserCredentialsFormValues) => {
		return await editUserCredentialsAction({ password, oldPassword, userId: context?.userId });
	};

	return <EditUserCredentialsForm handleSubmit={handleSubmit} />;
};

export default AccountPassword;
