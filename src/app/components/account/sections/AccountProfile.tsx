'use client';

import { accountContext } from '../AccountProvider';
import EditUserProfileForm, { EditUserProfileFormValues } from '../forms/EditUserProfileForm';
import { editUserProfileAction } from '@/app/actions/users/edit-user-profile.action';
import { useContext } from 'react';

const AccountProfile = () => {
	const context = useContext(accountContext);

	const handleSubmit = async ({ description, image }: EditUserProfileFormValues) => {
		const formData = new FormData();
		formData.append('description', description);
		formData.append('image', image);

		return await editUserProfileAction({
			userId: context?.userId,
			username: context?.username,
			formData,
		});
	};

	return (
		<EditUserProfileForm
			handleSubmit={handleSubmit}
			defaultValues={{ description: context?.description || '', defaultImage: context?.profileImage || '' }}
		/>
	);
};

export default AccountProfile;
