import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { AuthGuard, AuthModule } from '@thallesp/nestjs-better-auth';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { betterAuth } from 'better-auth';

import { JobsModule } from './jobs/jobs.module';
import { DatabaseModule, DRIZZLE } from './database/database.module';
import { UsersModule } from './users/users.module';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule.forRootAsync({
      imports: [DatabaseModule, ConfigModule],
      useFactory: (database: NodePgDatabase, configService: ConfigService) => ({
        auth: betterAuth({
          database: drizzleAdapter(database, { provider: 'pg' }),
          emailAndPassword: {
            enabled: true,
          },
          trustedOrigins: [configService.getOrThrow<string>('WEB_URL')],
        }),
      }),
      inject: [DRIZZLE, ConfigService],
    }),
    JobsModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
