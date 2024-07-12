import { cn } from '@/lib/utils';
import { IconLoader2 } from '@tabler/icons-react';
import Image from 'next/image';
import { ChangeEvent, startTransition, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../../ui/button';
import { EditResourceFormValues } from './EditResourceForm';

interface EditResourceImageProps {
	form: UseFormReturn<EditResourceFormValues, any, undefined>;
	updateFormImageValue: (e: ChangeEvent) => Promise<void>;
	removeFormImageValue: () => Promise<void>;
}

export const DEFAULT_IMAGE = 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/default.webp';
export const MAX_FILE_SIZE_MB = 2;

const EditResourceImage = ({ form, updateFormImageValue, removeFormImageValue }: EditResourceImageProps) => {
	const [loading, setLoading] = useState(false);
	const fileInput = useRef<HTMLInputElement>(null);
	const currentImage = form.watch('imgUrl');

	const handleBrowseImageClick = () => {
		fileInput.current?.click();
	};

	const handleInputFileChange = async (e: ChangeEvent) => {
		setLoading(true);
		await updateFormImageValue(e);

		startTransition(() => {
			if (fileInput.current) {
				fileInput.current.value = '';
			}
			setLoading(false);
		});
	};

	const handleRemoveImageClick = async () => await removeFormImageValue();

	return (
		<div className='flex flex-col space-y-2 w-[140px]'>
			<picture className='relative rounded-md w-full h-[140px]'>
				{loading && (
					<div className={cn('absolute size-[140px] rounded-full opacity-60 bg-black grid place-items-center')}>
						<span className='text-blue-300 animate-spin'>
							<IconLoader2 size={20} />
						</span>
					</div>
				)}
				<Image
					src={currentImage || DEFAULT_IMAGE}
					alt='Resource image'
					width={600}
					height={600}
					className='rounded-full w-full h-full object-cover '
				/>
			</picture>

			<input
				ref={fileInput}
				type='file'
				accept='image/png, image/jpeg, image/webp'
				hidden
				onChange={handleInputFileChange}
			/>
			<Button
				type='button'
				onClick={() => handleBrowseImageClick()}>
				Browse image
			</Button>
			<Button
				variant={'outline'}
				type='button'
				onClick={() => handleRemoveImageClick()}>
				Remove image
			</Button>
		</div>
	);
};

export default EditResourceImage;
