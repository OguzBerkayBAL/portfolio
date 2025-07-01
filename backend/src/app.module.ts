import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import appConfig from './config/app.config';
import { ProjectsModule } from './modules/projects/projects.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { BlogModule } from './modules/blog/blog.module';
import { ContactModule } from './modules/contact/contact.module';
import { ResumeModule } from './modules/resume/resume.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedService } from './database/seed.service';
import { User, UserSchema } from './entities/user.entity';
import { Project, ProjectSchema } from './entities/project.entity';
import { Skill, SkillSchema } from './entities/skill.entity';

@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Database configuration with MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),

    // Schema imports for SeedService
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Skill.name, schema: SkillSchema },
    ]),

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
  providers: [AppService, SeedService],
})
export class AppModule { }
