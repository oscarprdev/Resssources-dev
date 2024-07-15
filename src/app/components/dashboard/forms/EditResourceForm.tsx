import { ResourceWithUserInfo } from '@/features/dashboard/application/list-resources/list-resources.use-case.types';
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
};

const EditResourceForm = ({ resource }: EditResourceFormProps) => {
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
		// const response = await handleSubmit(values);
		// if (response && isError(response)) {
		// 	return form.setValue('error', response.error);
		// }

		// afterAddResourceSubmit(response ? response.success : CREATE_RESOURCES_SUCCESS.DEFAULT);

		console.log(values);
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
				<div className='flex items-center space-x-2 w-full mt-4'>
					<Button>Update</Button>
					<Button variant={'outline'}>Cancel</Button>
				</div>
			</form>
		</Form>
	);
};

export default EditResourceForm;
