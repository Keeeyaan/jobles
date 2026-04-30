import { createZodDto } from 'nestjs-zod';

import { CreateFolderSchema } from '@repo/schemas';

export class CreateFolderDto extends createZodDto(CreateFolderSchema) {}
