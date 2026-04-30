import { Controller } from '@nestjs/common';
import { TestCasesService } from './test-cases.service';

@Controller('test-cases')
export class TestCasesController {
  constructor(private readonly testCasesService: TestCasesService) {}
}
