import { Either } from '@/lib/either';

export interface IListArrivalsResourcesUsecase {
	listArrivals(): Promise<Either<string, void>>;
}

export class ListArrivalsResourcesUsecase implements IListArrivalsResourcesUsecase {
    constructor() {}

    async listArrivals(): Promise<Either<string, void>> {
        try {
            
        } catch (error) {
            
        }
    }
}
