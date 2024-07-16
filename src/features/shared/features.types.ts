import { Either } from '@/lib/either';

export type UsecaseResponse<T> = Promise<Either<string, T>>;
