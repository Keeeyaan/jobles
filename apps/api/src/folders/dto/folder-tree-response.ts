import { createZodDto } from 'nestjs-zod';

import { FolderTreeResponseSchema } from '@repo/schemas';

export class FolderTreeResponseDto extends createZodDto(
  FolderTreeResponseSchema,
) {}
