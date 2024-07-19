import Home from '@/app/components/home/Home';

type HomePageProps = {
	searchParams: {
		kinds: string;
	};
};

export default function HomePage({ searchParams: { kinds } }: HomePageProps) {
	return <Home kinds={kinds} />;
}
