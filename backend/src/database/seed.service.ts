import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User, UserRole, UserStatus } from '../entities/user.entity';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Skill, SkillCategory, SkillLevel } from '../entities/skill.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(Skill)
        private skillRepository: Repository<Skill>,
        private configService: ConfigService,
    ) { }

    async onModuleInit() {
        const useSqlite = this.configService.get('USE_SQLITE') === 'true';
        const isProduction = this.configService.get('NODE_ENV') === 'production';

        if (useSqlite && isProduction) {
            await this.seedData();
        }
    }

    private async seedData() {
        try {
            // Check if data already exists
            const userCount = await this.userRepository.count();
            if (userCount > 0) {
                console.log('📊 Database already has data, skipping seed...');
                return;
            }

            console.log('🌱 Seeding database with initial data...');

            // Create admin user
            const hashedPassword = await bcrypt.hash('admin123', 12);
            const adminUser = this.userRepository.create({
                username: 'oguzberkaybal',
                email: 'oguzberkaybal@icloud.com',
                firstName: 'Oğuz Berkay',
                lastName: 'BAL',
                role: UserRole.ADMIN,
                status: UserStatus.ACTIVE,
                emailVerified: true,
            });
            // Set password directly to avoid double hashing
            adminUser.password = hashedPassword;
            await this.userRepository.save(adminUser);

            // Create sample projects
            const projects = [
                {
                    title: 'Portfolio Website',
                    description: 'Modern cyberpunk-themed portfolio website built with React and NestJS',
                    longDescription: 'A full-stack portfolio application featuring dark theme design, terminal aesthetics, and modern web technologies.',
                    technologies: ['React', 'TypeScript', 'NestJS', 'SQLite', 'Framer Motion'],
                    githubUrl: 'https://github.com/OguzBerkayBAL/portfolio',
                    liveUrl: 'https://oguzberkaybal-portfolio.onrender.com',
                    imageUrl: '/images/portfolio-preview.jpg',
                    featured: true,
                    status: ProjectStatus.COMPLETED,
                },
                {
                    title: 'E-Commerce Platform',
                    description: 'Modern e-commerce solution with dark theme',
                    longDescription: 'Full-featured e-commerce platform with cart, payments, and admin dashboard.',
                    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                    githubUrl: 'https://github.com/OguzBerkayBAL/ecommerce',
                    featured: true,
                    status: ProjectStatus.COMPLETED,
                },
                {
                    title: 'Task Management App',
                    description: 'Cyberpunk-themed task management application',
                    longDescription: 'Professional task management with team collaboration features.',
                    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
                    featured: false,
                    status: ProjectStatus.IN_PROGRESS,
                }
            ];

            for (const projectData of projects) {
                const project = this.projectRepository.create(projectData);
                await this.projectRepository.save(project);
            }

            // Create sample skills
            const skills = [
                { name: 'JavaScript', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, order: 1 },
                { name: 'TypeScript', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, order: 2 },
                { name: 'React', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, order: 3 },
                { name: 'Next.js', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, order: 4 },
                { name: 'Node.js', category: SkillCategory.BACKEND, level: SkillLevel.ADVANCED, order: 1 },
                { name: 'NestJS', category: SkillCategory.BACKEND, level: SkillLevel.ADVANCED, order: 2 },
                { name: 'PostgreSQL', category: SkillCategory.DATABASE, level: SkillLevel.ADVANCED, order: 1 },
                { name: 'MongoDB', category: SkillCategory.DATABASE, level: SkillLevel.INTERMEDIATE, order: 2 },
                { name: 'Docker', category: SkillCategory.DEVOPS, level: SkillLevel.INTERMEDIATE, order: 1 },
                { name: 'Git', category: SkillCategory.TOOLS, level: SkillLevel.ADVANCED, order: 1 },
            ];

            for (const skillData of skills) {
                const skill = this.skillRepository.create(skillData);
                await this.skillRepository.save(skill);
            }

            console.log('✅ Database seeded successfully!');
        } catch (error) {
            console.error('❌ Error seeding database:', error);
        }
    }
} 