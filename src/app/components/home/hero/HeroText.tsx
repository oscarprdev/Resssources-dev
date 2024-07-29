import { IconQuote } from '@tabler/icons-react';

const HeroText = () => {
	return (
		<div className="flex flex-col text-center gap-2">
			<div className="relative">
				<h1 className="text-6xl uppercase">
					Re<span className="font-bold">sss</span>ources
				</h1>
				<span aria-hidden className="absolute -bottom-4 right-0 font-bold text-5xl text-primary">
					DEV
				</span>
			</div>

			<div className="relative flex items-center p-2">
				<IconQuote size={16} className="absolute top-2 -left-2 transform -rotate-180" />
				<p className="text-xl">Find, share and store your favourites dev resources</p>
				<IconQuote size={16} className="absolute top-2 -right-2" />
			</div>
		</div>
	);
};

export default HeroText;
