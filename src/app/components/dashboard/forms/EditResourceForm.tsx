import { ResourceWithUserInfo } from '@/features/dashboard/application/list-resources/list-resources.use-case.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { ChangeEvent } from 'react';
import EditResourceImage, { DEFAULT_IMAGE, MAX_FILE_SIZE_MB } from './EditResourceImageField';
import { toast } from '../../ui/use-toast';
import { isError } from '@/lib/either';
import { uploadImage } from '@/app/actions/images/upload-image';

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
			if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
				toast({
					description: `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`,
					variant: 'destructive',
				});
				return;
			}

			const formData = new FormData();
			formData.append('image', file, file?.type);
			uploadImage();
			// const response = await updateImage(formData);
			// if (isError(response)) {
			// 	toast({
			// 		description: response.error,
			// 		variant: 'destructive',
			// 	});
			// 	return;
			// }

			// form.setValue('imgUrl', response.right);
		}
	};

	const removeFormImageValue = async () => {
		// const response = await removeImage();
		// if (isError(response)) {
		// 	toast({
		// 		description: response.error,
		// 		variant: 'destructive',
		// 	});
		// 	return;
		// }

		form.setValue('imgUrl', DEFAULT_IMAGE);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-3 w-full'>
				<EditResourceImage
					form={form}
					updateFormImageValue={updateFormImageValue}
					removeFormImageValue={removeFormImageValue}
				/>
			</form>
		</Form>
	);
};

export default EditResourceForm;
