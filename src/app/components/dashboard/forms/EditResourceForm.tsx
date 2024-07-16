import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { ChangeEvent } from 'react';
import EditResourceImage from './EditResourceImageField';
import { isError } from '@/lib/either';
import { uploadImageAction } from '@/app/actions/images/upload-image';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { updateResourceInfoAction, UpdateResourceInfoActionInput } from '@/app/actions/resources/update-resource-info';
import { IconDots } from '@tabler/icons-react';
import { ResourceWithUserInfo } from '@/features/shared/types/global.types';

const editResourceFormSchema = z.object({
	title: z.string(),
	description: z.string(),
	url: z.string().url({
		message: 'Resource URL is not valid',
	}),
	imgUrl: z.string().url({
		message: 'Image URL is not valid',
	}),
});

export type EditResourceFormValues = {
	title: string;
	description: string;
	url: string;
	imgUrl: string;
	error: string | null;
};

export type EditResourceFormProps = {
	resource: ResourceWithUserInfo;
	toggleModal: (opened: boolean) => void;
};

const EditResourceForm = ({ resource, toggleModal }: EditResourceFormProps) => {
	const form = useForm<EditResourceFormValues>({
		resolver: zodResolver(editResourceFormSchema),
		defaultValues: {
			title: resource.title,
			description: resource.description,
			url: resource.resourceUrl,
			imgUrl: resource.imgUrl,
		},
	});

	const onSubmit = async (values: EditResourceFormValues) => {
		const payload = {
			title: values.title,
			description: values.description,
			imgUrl: values.imgUrl,
			resourceUrl: values.url,
			resourceId: resource.id,
		} satisfies UpdateResourceInfoActionInput;

		const response = await updateResourceInfoAction(payload);
		if (response && isError(response)) {
			return form.setValue('error', response.error);
		}

		toggleModal(false);
	};

	const updateFormImageValue = async (e: ChangeEvent) => {
		if (e.target instanceof HTMLInputElement) {
			const [file] = Array.from(e.target.files!);
			const formData = new FormData();
			formData.append('image', file, file?.type);
			formData.append('resourceId', resource.id);

			const response = await uploadImageAction({ formData });
			if (isError(response)) {
				return form.setValue('error', response.error);
			}

			form.setValue('imgUrl', response.success.imgUrl);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col items-start gap-3 w-full'>
				<EditResourceImage
					form={form}
					updateFormImageValue={updateFormImageValue}
				/>

				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem className='animate-fade-up w-full'>
							<FormLabel className='text-zinc-700 font-normal'>Title</FormLabel>
							<FormControl>
								<Input
									placeholder='Title'
									disabled={form.formState.isSubmitting}
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='url'
					render={({ field }) => (
						<FormItem className='animate-fade-up w-full'>
							<FormLabel className='text-zinc-700 font-normal'>URL</FormLabel>
							<FormControl>
								<Input
									type='url'
									placeholder='URL'
									disabled={form.formState.isSubmitting}
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem className='animate-fade-up w-full'>
							<FormLabel className='text-zinc-700 font-normal'>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Description'
									disabled={form.formState.isSubmitting}
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='relative flex items-center space-x-2 w-full mt-6'>
					{form.getValues('error') && (
						<FormMessage className='absolute -top-6 w-full flex items-center justify-center'>{form.getValues('error')}</FormMessage>
					)}
					<Button disabled={form.formState.isSubmitting || !form.formState.isDirty}>
						{form.formState.isSubmitting ? <IconDots className='animate-pulse text-zinc-300' /> : 'Update'}
					</Button>
					<Button
						type='button'
						variant={'secondary'}
						onClick={() => toggleModal(false)}>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default EditResourceForm;
