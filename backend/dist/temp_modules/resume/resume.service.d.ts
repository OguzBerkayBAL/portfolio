import { Repository } from 'typeorm';
import { Resume } from '../../entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { QueryResumeDto } from './dto/query-resume.dto';
export declare class ResumeService {
    private resumeRepository;
    constructor(resumeRepository: Repository<Resume>);
    create(createResumeDto: CreateResumeDto): Promise<Resume>;
    findAll(queryDto: QueryResumeDto): Promise<{
        data: Resume[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<Resume>;
    findActive(): Promise<Resume>;
    findByVersion(version: string): Promise<Resume>;
    update(id: number, updateResumeDto: UpdateResumeDto): Promise<Resume>;
    remove(id: number): Promise<void>;
    setActive(id: number): Promise<Resume>;
    getStats(): Promise<{
        total: number;
        active: number;
        byTemplate: Record<string, number>;
        recentCount: number;
    }>;
    generatePDF(id: number, template?: string): Promise<Buffer>;
    private generateHTMLTemplate;
    private generateModernTemplate;
    private generateCyberpunkTemplate;
    private generateClassicTemplate;
}
