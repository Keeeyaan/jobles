import { createZodDto } from 'nestjs-zod';

import { DeleteFolderSchema } from '@repo/schemas';

export class DeleteFolderDto extends createZodDto(DeleteFolderSchema) {}
