import { createZodDto } from 'nestjs-zod';

import { RenameFolderSchema } from '@repo/schemas';

export class RenameFolderDto extends createZodDto(RenameFolderSchema) {}
