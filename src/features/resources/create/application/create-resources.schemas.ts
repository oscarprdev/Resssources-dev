import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const RESOURCE_KIND_VALUES: $Enums.Kind[] = [
	$Enums.Kind.FRONTEND,
	$Enums.Kind.BACKEND,
	$Enums.Kind.UI,
	$Enums.Kind.DATABASES,
	$Enums.Kind.STYLES,
	$Enums.Kind.ALGORITHMS,
	$Enums.Kind.ARCHITECTURE,
	$Enums.Kind.TOOLS,
	$Enums.Kind.FRAMEWORKS,
	$Enums.Kind.TESTING,
	$Enums.Kind.DEVOPS,
	$Enums.Kind.SECURITY,
	$Enums.Kind.AI,
];

export const createResourceInputSchema = z.object({
	username: z.string(),
	resourceUrl: z.string().url(),
	kinds: z.array(z.nativeEnum($Enums.Kind)),
});
