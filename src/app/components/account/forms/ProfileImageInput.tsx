import { toast } from '../../ui/use-toast';
import { EditUserProfileFormValues } from './EditUserProfileForm';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface ProfileImageInputProps {
	form: UseFormReturn<EditUserProfileFormValues, any, undefined>;
}

export const MAX_FILE_SIZE_MB = 2;

const ProfileImageInput = ({ form }: ProfileImageInputProps) => {
	const fileInput = useRef<HTMLInputElement>(null);
	const previewImage = form.watch('defaultImage');

	const handleBrowseImageClick = () => {
		fileInput.current?.click();
	};

	const handleInputFileChange = async (e: ChangeEvent) => {
		if (e.target instanceof HTMLInputElement) {
			const [file] = Array.from(e.target.files!);
			if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
				return toast({
					description: `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`,
					variant: 'destructive',
				});
			}

			form.setValue('image', file);
			form.setValue('defaultImage', URL.createObjectURL(file));
		}

		if (fileInput.current) {
			fileInput.current.value = '';
		}
	};

	const handleRemoveImageClick = async () => {
		form.resetField('image');
		form.resetField('defaultImage');
	};

	return (
		<div className="flex items-center gap-5">
			<picture className="relative rounded-md size-[80px]">
				<Image
					src={previewImage}
					alt="Resume image"
					width={600}
					height={600}
					className="rounded-full w-full h-full object-cover "
				/>
			</picture>

			<input
				ref={fileInput}
				type="file"
				accept="image/png, image/jpeg, image/webp"
				hidden
				onChange={handleInputFileChange}
			/>
			<div className="flex items-center w-[200px] gap-2">
				<Button type="button" size={'sm'} variant={'outline'} onClick={() => handleBrowseImageClick()}>
					Upload new image
				</Button>
				<Button type="button" size={'sm'} variant={'clear'} onClick={() => handleRemoveImageClick()}>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default ProfileImageInput;
