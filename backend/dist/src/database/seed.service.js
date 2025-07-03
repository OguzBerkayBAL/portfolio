"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../entities/user.entity");
const project_entity_1 = require("../entities/project.entity");
const skill_entity_1 = require("../entities/skill.entity");
const bcrypt = require("bcrypt");
let SeedService = class SeedService {
    userRepository;
    projectRepository;
    skillRepository;
    configService;
    constructor(userRepository, projectRepository, skillRepository, configService) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.configService = configService;
    }
    async onModuleInit() {
        const isProduction = this.configService.get('NODE_ENV') === 'production';

        if (isProduction) {
            await this.seedData();
        }
    }
    async seedData() {
        try {
            const userCount = await this.userRepository.count();
            if (userCount > 0) {
                console.log('📊 Database already has data, skipping seed...');
                return;
            }
            console.log('🌱 Seeding database with initial data...');
            const hashedPassword = await bcrypt.hash('admin123', 12);
            const adminUser = this.userRepository.create({
                username: 'oguzberkaybal',
                email: 'oguzberkaybal@icloud.com',
                firstName: 'Oğuz Berkay',
                lastName: 'BAL',
                role: user_entity_1.UserRole.ADMIN,
                status: user_entity_1.UserStatus.ACTIVE,
                emailVerified: true,
            });
            adminUser.password = hashedPassword;
            await this.userRepository.save(adminUser);
            const projects = [
                {
                    title: 'Portfolio Website',
                    description: 'Modern cyberpunk-themed portfolio website built with React and NestJS',
                    longDescription: 'A full-stack portfolio application featuring dark theme design, terminal aesthetics, and modern web technologies.',
                    technologies: ['React', 'TypeScript', 'NestJS', 'Framer Motion'],
                    githubUrl: 'https://github.com/OguzBerkayBAL/portfolio',
                    liveUrl: 'https://oguzberkaybal-portfolio.onrender.com',
                    imageUrl: '/images/portfolio-preview.jpg',
                    featured: true,
                    status: project_entity_1.ProjectStatus.COMPLETED,
                },
                {
                    title: 'E-Commerce Platform',
                    description: 'Modern e-commerce solution with dark theme',
                    longDescription: 'Full-featured e-commerce platform with cart, payments, and admin dashboard.',
                    technologies: ['React', 'Node.js', 'Stripe'],
                    githubUrl: 'https://github.com/OguzBerkayBAL/ecommerce',
                    featured: true,
                    status: project_entity_1.ProjectStatus.COMPLETED,
                },
                {
                    title: 'Task Management App',
                    description: 'Cyberpunk-themed task management application',
                    longDescription: 'Professional task management with team collaboration features.',
                    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
                    featured: false,
                    status: project_entity_1.ProjectStatus.IN_PROGRESS,
                }
            ];
            for (const projectData of projects) {
                const project = this.projectRepository.create(projectData);
                await this.projectRepository.save(project);
            }
            const skills = [
                { name: 'JavaScript', category: skill_entity_1.SkillCategory.FRONTEND, level: skill_entity_1.SkillLevel.EXPERT, order: 1 },
                { name: 'TypeScript', category: skill_entity_1.SkillCategory.FRONTEND, level: skill_entity_1.SkillLevel.ADVANCED, order: 2 },
                { name: 'React', category: skill_entity_1.SkillCategory.FRONTEND, level: skill_entity_1.SkillLevel.EXPERT, order: 3 },
                { name: 'Next.js', category: skill_entity_1.SkillCategory.FRONTEND, level: skill_entity_1.SkillLevel.ADVANCED, order: 4 },
                { name: 'Node.js', category: skill_entity_1.SkillCategory.BACKEND, level: skill_entity_1.SkillLevel.ADVANCED, order: 1 },
                { name: 'NestJS', category: skill_entity_1.SkillCategory.BACKEND, level: skill_entity_1.SkillLevel.ADVANCED, order: 2 },
                { name: 'PostgreSQL', category: skill_entity_1.SkillCategory.DATABASE, level: skill_entity_1.SkillLevel.ADVANCED, order: 1 },
                { name: 'Docker', category: skill_entity_1.SkillCategory.DEVOPS, level: skill_entity_1.SkillLevel.INTERMEDIATE, order: 1 },
                { name: 'Git', category: skill_entity_1.SkillCategory.TOOLS, level: skill_entity_1.SkillLevel.ADVANCED, order: 1 },
            ];
            for (const skillData of skills) {
                const skill = this.skillRepository.create(skillData);
                await this.skillRepository.save(skill);
            }
            console.log('✅ Database seeded successfully!');
        }
        catch (error) {
            console.error('❌ Error seeding database:', error);
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(2, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], SeedService);
//# sourceMappingURL=seed.service.js.map