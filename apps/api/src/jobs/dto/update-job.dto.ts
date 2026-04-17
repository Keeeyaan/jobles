import { createZodDto } from 'nestjs-zod';

import { UpdateJobSchema } from '@repo/schemas';

export class UpdateJobDto extends createZodDto(UpdateJobSchema) {}
