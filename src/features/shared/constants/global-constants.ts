import { Kind } from '../types/global.types';

export const GLOBAL_ERRORS = {
	LIST_RESOURCES: 'Error listing resources',
	USER_BY_ID: 'Error retrieving user by its id',
};

export const RESOURCE_KIND_VALUES: Kind[] = [
	Kind.FRONTEND,
	Kind.BACKEND,
	Kind.UI,
	Kind.DATABASES,
	Kind.STYLES,
	Kind.ALGORITHMS,
	Kind.ARCHITECTURE,
	Kind.TOOLS,
	Kind.FRAMEWORKS,
	Kind.TESTING,
	Kind.DEVOPS,
	Kind.SECURITY,
	Kind.AI,
];

export const DEFAULT_IMAGE = 'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/default.webp';
