import { Button } from '../../ui/button';
import { EditResourceFormValues } from './EditResourceForm';
import { cn } from '@/lib/utils';
import { IconLoader2 } from '@tabler/icons-react';
import Image from 'next/image';
import { ChangeEvent, startTransition, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface EditResourceImageProps {
	form: UseFormReturn<EditResourceFormValues, any, undefined>;
	updateFormImageValue: (e: ChangeEvent) => Promise<void>;
}

const EditResourceImage = ({ form, updateFormImageValue }: EditResourceImageProps) => {
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

	return (
		<div className="flex flex-col space-y-4 w-[140px]">
			<picture className="relative rounded-lg w-full h-[140px]">
				{loading && (
					<div className={cn('absolute size-[140px] rounded-lg opacity-60 bg-black grid place-items-center')}>
						<span className="text-blue-300 animate-spin">
							<IconLoader2 size={20} />
						</span>
					</div>
				)}
				<Image
					src={currentImage}
					alt="Resource image"
					width={600}
					height={600}
					className="rounded-lg w-full h-full object-cover "
				/>
			</picture>

			<input
				ref={fileInput}
				type="file"
				accept="image/png, image/jpeg, image/webp"
				hidden
				onChange={handleInputFileChange}
			/>
			<Button type="button" variant={'secondary'} size={'sm'} onClick={() => handleBrowseImageClick()}>
				Browse image
			</Button>
		</div>
	);
};

export default EditResourceImage;
