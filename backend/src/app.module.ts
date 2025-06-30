import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import appConfig from './config/app.config';
import { entities } from './entities';
import { ProjectsModule } from './modules/projects/projects.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { BlogModule } from './modules/blog/blog.module';
import { ContactModule } from './modules/contact/contact.module';
import { ResumeModule } from './modules/resume/resume.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Database configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),

    // Rate limiting - simplified config
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 100,
      },
    ]),

    // Feature modules
    AuthModule,
    ProjectsModule,
    SkillsModule,
    ExperienceModule,
    BlogModule,
    ContactModule,
    ResumeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
