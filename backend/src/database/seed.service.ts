import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserRole, UserStatus } from '../entities/user.entity';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Skill, SkillCategory, SkillLevel } from '../entities/skill.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Project.name)
        private projectModel: Model<Project>,
        @InjectModel(Skill.name)
        private skillModel: Model<Skill>,
        private configService: ConfigService,
    ) { }

    async onModuleInit() {
        const isProduction = this.configService.get('NODE_ENV') === 'production';
        if (isProduction) {
            await this.seedData();
        }
    }

    private async seedData() {
        try {
            // Check if data already exists
            const userCount = await this.userModel.countDocuments();
            if (userCount > 0) {
                console.log('📊 Database already has data, skipping seed...');
                return;
            }

            console.log('🌱 Seeding MongoDB database with initial data...');

            // Create admin user with pre-hashed password
            const hashedPassword = await bcrypt.hash('admin123', 12);
            const adminUser = new this.userModel({
                username: 'oguzberkaybal',
                email: 'oguzberkaybal@icloud.com',
                firstName: 'Oğuz Berkay',
                lastName: 'BAL',
                role: UserRole.ADMIN,
                status: UserStatus.ACTIVE,
                emailVerified: true,
                password: hashedPassword, // Pre-hashed to avoid double hashing
            });
            await adminUser.save({ validateBeforeSave: false }); // Skip validation to avoid re-hashing

            // Create sample projects
            const projects = [
                {
                    title: 'Portfolio Website',
                    description: 'Modern cyberpunk-themed portfolio website built with React and NestJS',
                    longDescription: 'A full-stack portfolio application featuring dark theme design, terminal aesthetics, and modern web technologies.',
                    technologies: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'Framer Motion'],
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

            await this.projectModel.insertMany(projects);

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

            await this.skillModel.insertMany(skills);

            console.log('✅ MongoDB database seeded successfully!');
            console.log('👤 Admin User: oguzberkaybal@icloud.com / admin123');
        } catch (error) {
            console.error('❌ Error seeding MongoDB database:', error);
        }
    }
} 