'use client';

import { accountContext } from '../AccountProvider';
import EditUserSocialForm, { EditUserSocialFormValues } from '../forms/EditUserSocialForm';
import { editUserSocialAction } from '@/app/actions/users/edit-user-social.action';
import { useContext } from 'react';

const AccountSocial = () => {
	const context = useContext(accountContext);

	const handleSubmit = async ({ twitter, linkedin, github }: EditUserSocialFormValues) => {
		return await editUserSocialAction({ userId: context?.userId, twitter, linkedin, github });
	};

	return (
		<EditUserSocialForm
			handleSubmit={handleSubmit}
			defaultValues={{
				twitter: context?.socialMedia?.twitter || '',
				linkedin: context?.socialMedia?.linkedin || '',
				github: context?.socialMedia?.github || '',
			}}
		/>
	);
};

export default AccountSocial;
