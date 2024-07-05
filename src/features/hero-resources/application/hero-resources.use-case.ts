import { GetHeroResourcesOutput } from './hero-resources.types';
import { HeroResourcesPorts } from './hero-resources.ports';
import { Either, success, error } from '@/lib/either';

interface IHeroResourcesUsecase {
	getHeroResources(): Promise<Either<string, GetHeroResourcesOutput[]>>;
}

const mockData: GetHeroResourcesOutput[] = [
	{
		resourceId: '1',
		imgUrl: 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/Captura%20de%20pantalla%202024-07-05%20a%20las%2018.51.34.png',
		title: '',
	},
	{
		resourceId: '2',
		imgUrl: 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/Captura%20de%20pantalla%202024-07-05%20a%20las%2018.51.34.png',
		title: '',
	},
	{
		resourceId: '3',
		imgUrl: 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/Captura%20de%20pantalla%202024-07-05%20a%20las%2018.51.34.png',
		title: '',
	},
	{
		resourceId: '4',
		imgUrl: 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/Captura%20de%20pantalla%202024-07-05%20a%20las%2018.51.34.png',
		title: '',
	},
	{
		resourceId: '5',
		imgUrl: 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/Captura%20de%20pantalla%202024-07-05%20a%20las%2018.51.34.png',
		title: '',
	},
	{
		resourceId: '6',
		imgUrl: 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/Captura%20de%20pantalla%202024-07-05%20a%20las%2018.51.34.png',
		title: '',
	},
	{
		resourceId: '7',
		imgUrl: 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/Captura%20de%20pantalla%202024-07-05%20a%20las%2018.51.34.png',
		title: '',
	},
	{
		resourceId: '8',
		imgUrl: 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/Captura%20de%20pantalla%202024-07-05%20a%20las%2018.51.34.png',
		title: '',
	},
];

export class HeroResourcesUsecase implements IHeroResourcesUsecase {
	constructor(private readonly ports: HeroResourcesPorts) {}

	async getHeroResources() {
		try {
			const response = await this.ports.getResourcesData();

			return success(mockData);
		} catch (e: unknown) {
			return error(e instanceof Error ? e.message : 'Error listing hero resources');
		}
	}
}
