'use client';

import FormAction from '../../core/forms/FormAction';
import { Textarea } from '../../ui/textarea';
import { toast } from '../../ui/use-toast';
import ProfileImageInput from './ProfileImageInput';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { EditUserProfileInput } from '@/features/user/edit/application/edit-user.dto';
import { Either, isError } from '@/lib/either';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type EditUserProfileFormValues = EditUserProfileInput & { defaultImage: string; error: string | null };
type EditUserProfileFormProps = {
	handleSubmit(values: EditUserProfileFormValues): Promise<Either<string, string>>;
	defaultValues: {
		description: string;
		defaultImage: string;
		image?: File;
	};
};

const FORM_MESSAGES = {
	DESCRIPTION_MAX_LENGTH: 'Description must contain at most 200 character(s)',
};

const editUserProfileFormSchema = z.object({
	description: z.string().max(200, { message: FORM_MESSAGES.DESCRIPTION_MAX_LENGTH }),
	image: z.instanceof(File),
});

const EditUserProfileForm = ({ handleSubmit, defaultValues }: EditUserProfileFormProps) => {
	const form = useForm<EditUserProfileFormValues>({
		resolver: zodResolver(editUserProfileFormSchema),
		defaultValues,
	});

	const onSubmit = async (values: EditUserProfileFormValues) => {
		const response = await handleSubmit(values);
		if (response && isError(response)) {
			return form.setValue('error', response.error);
		}

		toast({
			description: response.success,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
				<ProfileImageInput form={form} />
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="animate-fade-up">
							<FormLabel className="text-zinc-700 font-bold">Description</FormLabel>
							<FormControl>
								<Textarea placeholder="Description" required {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="ml-auto min-w-[200px]">
					<FormAction error={form.getValues('error')} isSubmitting={form.formState.isSubmitting} />
				</div>
			</form>
		</Form>
	);
};

export default EditUserProfileForm;
