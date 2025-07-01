import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';
import { Skill } from '../entities/skill.entity';
export declare class SeedService implements OnModuleInit {
    private userRepository;
    private projectRepository;
    private skillRepository;
    private configService;
    constructor(userRepository: Repository<User>, projectRepository: Repository<Project>, skillRepository: Repository<Skill>, configService: ConfigService);
    onModuleInit(): Promise<void>;
    private seedData;
}
