'use client';

import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import SearchResourcesFounded from './SearchResourcesFounded';
import { useListResourcesBySearch } from '@/app/hooks/useListResourcesBySearch';
import { RESOURCE_KIND_VALUES } from '@/features/shared/constants/global-constants';
import { Kind } from '@/features/shared/types/global.types';
import { IconSearch } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export type KindSelected = Kind | 'all';

const SearchResourcesInput = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const [kindSelected, setKindSelected] = useState<KindSelected>();

	const { resources } = useListResourcesBySearch({ inputValue, kindSelected });

	const handleKindSelectChange = (kind: string) => {
		const kindSelected = kind as Kind;

		if (RESOURCE_KIND_VALUES.includes(kindSelected)) {
			setKindSelected(kindSelected);
		} else {
			setKindSelected('all');
		}
	};

	const handleInputChange = useDebouncedCallback((e: ChangeEvent) => {
		const target = e.target;
		if (target instanceof HTMLInputElement) {
			setInputValue(target.value);
		}
	}, 500);

	return (
		<div className="relative group w-[500px] py-2 px-5 flex items-center justify-between rounded-full border border-zinc-200 ring-4 ring-transparent duration-300 hover:ring-blue-200/50 hover:border-blue-300">
			<IconSearch size={35} className="text-zinc-400 group-hover:text-zinc-600 duration-300" />
			<Input
				type="search"
				className="group-hover:placeholder:text-zinc-600 ml-2 outline-none placeholder:text-xs border-none p-1 focus-visible:border-none hover:border-none focus-visible:ring-transparent hover:ring-transparent duration-300"
				placeholder="Search more ressources..."
				onChange={handleInputChange}
			/>
			<Select onValueChange={kind => handleKindSelectChange(kind)} value={kindSelected}>
				<SelectTrigger className="capitalize w-52 text-xs border-transparent border-l-[1px] border-l-zinc-200 pl-3 rounded-none py-1 focus:border-none outline-none focus:outline-none focus-visible:border-none">
					<SelectValue placeholder="All kinds" />
				</SelectTrigger>
				<SelectContent className="bg-white max-h-[200px]" side="bottom">
					<SelectItem value={'all'} className="capitalize text-xs text-zinc-400 hover:text-zinc-600">
						All kinds
					</SelectItem>
					{RESOURCE_KIND_VALUES.map(kind => (
						<SelectItem
							key={kind}
							value={kind}
							className="capitalize text-xs text-zinc-400 hover:text-zinc-600">
							{kind.toLowerCase()}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{inputValue.length > 0 && <SearchResourcesFounded resources={resources} />}
		</div>
	);
};

export default SearchResourcesInput;
