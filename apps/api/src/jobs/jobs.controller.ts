import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ZodResponse } from 'nestjs-zod';

import { JobsService } from './jobs.service';
import { JobResponseDto } from './dto/job-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

@Controller('jobs')
@ApiTags('Jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ZodResponse({ type: [JobResponseDto] })
  @ApiOperation({ summary: 'Get user jobs' })
  getUserJobs(@Session() session: UserSession) {
    const userId = session.user.id;
    return this.jobsService.getUserJobs(userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get user job stats' })
  getUserJobStats(@Session() session: UserSession) {
    const userId = session.user.id;
    return this.jobsService.getUserJobStats(userId);
  }

  @Get(':id')
  @ZodResponse({ type: JobResponseDto })
  @ApiOperation({ summary: 'Get a job by ID' })
  getJobById(@Param('id') id: number) {
    return this.jobsService.getJobById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  createJob(@Body() job: CreateJobDto, @Session() session: UserSession) {
    return this.jobsService.createJob({ job, userId: session.user.id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing job' })
  updateJobById(@Param('id') id: number, @Body() updatedJob: UpdateJobDto) {
    console.log('Updating job with ID:', id, 'Updated data:', updatedJob);
    // return this.jobsService.updateJobById(+id, updatedJob);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing job' })
  deleteJobById(@Param('id') id: string) {
    // return this.jobsService.deleteJobById(+id);
    console.log('Deleting job with ID:', id);
  }
}
