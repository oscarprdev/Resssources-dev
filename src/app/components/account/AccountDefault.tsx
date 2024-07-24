'use client';

import { accountContext } from './AccountProvider';
import EditUserInfoForm, { EditUserInfoFormValues } from './forms/EditUserInfoForm';
import { editUserInfoAction } from '@/app/actions/users/edit-user-info.action';
import { useContext } from 'react';

const AccountDefault = () => {
	const context = useContext(accountContext);

	const handleSubmit = async ({ email }: EditUserInfoFormValues) => {
		return await editUserInfoAction({ email, userId: context?.userId });
	};

	return <EditUserInfoForm handleSubmit={handleSubmit} defaultValues={{ email: context?.email || '' }} />;
};

export default AccountDefault;
