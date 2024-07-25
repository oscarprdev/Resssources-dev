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
		<div className="flex items-center gap-4 w-full">
			<picture className="relative rounded-full size-[90px]">
				{loading && (
					<div
						className={cn('absolute size-[90px] rounded-full opacity-60 bg-black grid place-items-center')}>
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
			<Button
				className='className="text-sm px-5 py-[0.3rem] rounded-full font-semibold border border-zinc-300 hover:bg-zinc-50 duration-300"'
				type="button"
				variant={'secondary'}
				size={'sm'}
				onClick={() => handleBrowseImageClick()}>
				Browse image
			</Button>
		</div>
	);
};

export default EditResourceImage;
