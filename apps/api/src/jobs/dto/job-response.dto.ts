import { createZodDto } from 'nestjs-zod';

import { JobResponseSchema } from '@repo/schemas';

export class JobResponseDto extends createZodDto(JobResponseSchema) {}
