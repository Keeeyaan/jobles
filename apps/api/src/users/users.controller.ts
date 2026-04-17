import { Controller, Get } from '@nestjs/common';
import {
  Session,
  UserSession,
  AllowAnonymous,
  OptionalAuth,
} from '@thallesp/nestjs-better-auth';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
