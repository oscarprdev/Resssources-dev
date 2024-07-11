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
import { Badge } from '../../ui/badge';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CREATE_RESOURCES_SUCCESS } from '@/features/create-resource/application/create-resources.constants';

export type AddResourceFormValues = { url: string; kinds: $Enums.Kind[]; error: string | null };
type AddResourceFormProps = {
	handleSubmit(values: AddResourceFormValues): Promise<Either<string, string>>;
	afterAddResourceSubmit(successMessage: string): void;
};

const AddresourceFormSchema = z.object({
	url: z.string().url({
		message: 'Url is not valid',
	}),
	kinds: z.array(z.string()),
});

const defaultValues: AddResourceFormValues = {
	url: '',
	kinds: [],
	error: null,
};

const MAX_KINDS = 3;

const AddResourceForm = ({ handleSubmit, afterAddResourceSubmit }: AddResourceFormProps) => {
	const form = useForm<AddResourceFormValues>({
		resolver: zodResolver(AddresourceFormSchema),
		defaultValues,
	});

	const onSubmit = async (values: AddResourceFormValues) => {
		const response = await handleSubmit(values);
		if (response && isError(response)) {
			return form.setValue('error', response.error);
		}

		afterAddResourceSubmit(response ? response.success : CREATE_RESOURCES_SUCCESS.DEFAULT);
	};

	const handleSelectKindChange = (currentKinds: $Enums.Kind[], kindSelected: $Enums.Kind) => {
		if (currentKinds.includes(kindSelected)) return;

		form.setValue('kinds', [...currentKinds, kindSelected]);
	};

	const handleRemoveKind = (currentKinds: $Enums.Kind[], kindToRemove: $Enums.Kind) => {
		const kindIndex = currentKinds.findIndex((kind) => kind === kindToRemove);
		currentKinds.splice(kindIndex, 1);

		const badge = document.querySelector(`#badge-${kindToRemove}`);
		badge?.setAttribute('aria-pressed', 'true');

		setTimeout(() => {
			form.setValue('kinds', [...currentKinds]);
		}, 300);
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
					name='kinds'
					render={({ field }) => (
						<FormItem>
							<div className='flex flex-col items-start gap-2'>
								<div className='flex items-center gap-2'>
									<FormLabel className='text-zinc-700 font-normal'>Resource Kinds</FormLabel>
									<p className={cn('text-xs', field.value.length < MAX_KINDS ? 'text-zinc-200' : 'text-zinc-400')}>
										{field.value.length}/{MAX_KINDS}
									</p>
								</div>
								<div className='flex items-center gap-1 flex-wrap'>
									{field.value.map((kind) => (
										<Badge
											id={`badge-${kind}`}
											variant={'withicon'}
											key={kind}
											className='flex items-center justify-between gap-1 animate-fade-up-light aria-pressed:animate-fade-down-light'>
											{kind}
											<button
												type='button'
												disabled={form.formState.isSubmitting}
												onClick={() => handleRemoveKind(field.value, kind)}
												className='text-blue-100 p-1 rounded-full bg-transparent hover:bg-blue-200 hover:text-blue-500 duration-300'>
												<XIcon size={14} />
											</button>
										</Badge>
									))}
								</div>
							</div>
							<Select
								onValueChange={(kind) => handleSelectKindChange(field.value, kind as $Enums.Kind)}
								value=''>
								<FormControl>
									<SelectTrigger
										className='capitalize'
										disabled={field.value.length === MAX_KINDS || form.formState.isSubmitting}>
										<SelectValue placeholder='Select resource kind' />
									</SelectTrigger>
								</FormControl>
								<SelectContent
									className='bg-white max-h-[200px]'
									side='bottom'>
									{RESOURCE_KIND_VALUES.map((kind) => (
										<SelectItem
											aria-selected={field.value.includes(kind)}
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
