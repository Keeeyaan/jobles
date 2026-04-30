import { createZodDto } from 'nestjs-zod';

import { FolderResponseSchema } from '@repo/schemas';

export class FolderResponseDto extends createZodDto(FolderResponseSchema) {}
