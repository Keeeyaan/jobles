import { createZodDto } from 'nestjs-zod';

import { CreateJobSchema } from '@repo/schemas';

export class CreateJobDto extends createZodDto(CreateJobSchema) {}
