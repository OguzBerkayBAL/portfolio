import { Repository } from 'typeorm';
import { Experience } from '../../entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { QueryExperienceDto } from './dto/query-experience.dto';
export declare class ExperienceService {
    private readonly experienceRepository;
    constructor(experienceRepository: Repository<Experience>);
    create(createExperienceDto: CreateExperienceDto): Promise<Experience>;
    findAll(queryDto: QueryExperienceDto): Promise<{
        data: Experience[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Experience>;
    findCurrent(): Promise<Experience[]>;
    getCareerTimeline(): Promise<Experience[]>;
    update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<Experience>;
    remove(id: string): Promise<void>;
    getCareerStats(): Promise<{
        total: number;
        current: number;
        totalYears: number;
        companiesCount: number;
        techStats: {
            totalTechnologies: number;
            topTechnologies: {
                technology: string;
                count: unknown;
            }[];
        };
        averageJobDuration: number;
    }>;
    getTechnologyStats(): Promise<{
        totalTechnologies: number;
        topTechnologies: {
            technology: string;
            count: unknown;
        }[];
    }>;
    private calculateTotalExperience;
    private getUniqueCompaniesCount;
    private applyFilters;
}
