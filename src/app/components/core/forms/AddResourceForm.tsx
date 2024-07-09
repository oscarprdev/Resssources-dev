'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Either, isError } from '@/lib/either';
import FormAction from './FormAction';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { $Enums } from '@prisma/client';
import { RESOURCE_KIND_VALUES } from '@/features/create-resource/application/create-resources.schemas';

export type AddResourceFormValues = { url: string; kind: $Enums.Kind | ''; error: string | null };
type AddResourceFormProps = {
	// handleSubmit(values: AddResourceFormValues): Promise<Either<string, string> | undefined>;
	handleSubmit(values: AddResourceFormValues): Promise<void>;
	afterAddResourceFormSubmit(): void;
};

const AddresourceFormSchema = z.object({
	url: z.string().url({
		message: 'Url is not valid',
	}),
	kind: z.string(),
});

const defaultValues: AddResourceFormValues = {
	url: '',
	kind: '',
	error: null,
};

const AddResourceForm = ({ handleSubmit, afterAddResourceFormSubmit }: AddResourceFormProps) => {
	const form = useForm<AddResourceFormValues>({
		resolver: zodResolver(AddresourceFormSchema),
		defaultValues,
	});

	// TODO: Call handle submit
	const onSubmit = async (values: AddResourceFormValues) => {
		// const response = await handleSubmit(values);
		// if (response && isError(response)) {
		// 	return form.setValue('error', response.error);
		// }

		afterAddResourceFormSubmit();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-3 w-full'>
				<FormField
					control={form.control}
					name='url'
					render={({ field }) => (
						<FormItem className='animate-fade-up'>
							<FormLabel className='text-zinc-700 font-normal'>Resource URL</FormLabel>
							<FormControl>
								<Input
									type='url'
									placeholder='Resource URL'
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
					name='kind'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-zinc-700 font-normal'>Resource Kind</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='capitalize'>
										<SelectValue placeholder='Select resource kind' />
									</SelectTrigger>
								</FormControl>
								<SelectContent
									className='bg-white max-h-[200px]'
									side='bottom'>
									{RESOURCE_KIND_VALUES.map((kind) => (
										<SelectItem
											aria-selected={kind === field.value}
											key={kind}
											value={kind}
											className='capitalize text-xs text-zinc-400 hover:text-zinc-600'>
											{kind.toLowerCase()}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription className='text-xs text-zinc-500'>Choose the kind that fits better for your resource.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormAction
					error={form.getValues('error')}
					isSubmitting={form.formState.isSubmitting}
				/>
			</form>
		</Form>
	);
};

export default AddResourceForm;
