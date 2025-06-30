import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like, Between } from 'typeorm';
import { Resume } from '../../entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { QueryResumeDto } from './dto/query-resume.dto';
// import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
  ) { }

  async create(createResumeDto: CreateResumeDto): Promise<Resume> {
    // Check if version already exists
    const existingResume = await this.resumeRepository.findOne({
      where: { version: createResumeDto.version }
    });

    if (existingResume) {
      throw new ConflictException(`Resume version '${createResumeDto.version}' already exists`);
    }

    // If this is set to active, deactivate other resumes
    if (createResumeDto.isActive !== false) {
      await this.resumeRepository.update(
        { isActive: true },
        { isActive: false }
      );
    }

    const resume = this.resumeRepository.create(createResumeDto);
    return await this.resumeRepository.save(resume);
  }

  async findAll(queryDto: QueryResumeDto): Promise<{
    data: Resume[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const {
      version,
      template,
      isActive,
      search,
      createdAfter,
      createdBefore,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = queryDto;

    const queryBuilder = this.resumeRepository.createQueryBuilder('resume');

    // Apply filters
    if (version) {
      queryBuilder.andWhere('resume.version ILIKE :version', { version: `%${version}%` });
    }

    if (template) {
      queryBuilder.andWhere('resume.template = :template', { template });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('resume.isActive = :isActive', { isActive });
    }

    if (search) {
      queryBuilder.andWhere(
        '(resume.personalInfo->>\'name\' ILIKE :search OR resume.personalInfo->>\'title\' ILIKE :search OR resume.personalInfo->>\'summary\' ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (createdAfter) {
      queryBuilder.andWhere('resume.createdAt >= :createdAfter', { createdAfter });
    }

    if (createdBefore) {
      queryBuilder.andWhere('resume.createdAt <= :createdBefore', { createdBefore });
    }

    // Apply sorting
    queryBuilder.orderBy(`resume.${sortBy}`, sortOrder);

    // Apply pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: number): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({
      where: { id }
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    return resume;
  }

  async findActive(): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({
      where: { isActive: true }
    });

    if (!resume) {
      throw new NotFoundException('No active resume found');
    }

    return resume;
  }

  async findByVersion(version: string): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({
      where: { version }
    });

    if (!resume) {
      throw new NotFoundException(`Resume version '${version}' not found`);
    }

    return resume;
  }

  async update(id: number, updateResumeDto: UpdateResumeDto): Promise<Resume> {
    const resume = await this.findOne(id);

    // If version is being updated, check for conflicts
    if (updateResumeDto.version && updateResumeDto.version !== resume.version) {
      const existingResume = await this.resumeRepository.findOne({
        where: { version: updateResumeDto.version }
      });

      if (existingResume) {
        throw new ConflictException(`Resume version '${updateResumeDto.version}' already exists`);
      }
    }

    // If setting this resume to active, deactivate others
    if (updateResumeDto.isActive === true) {
      await this.resumeRepository.update(
        { isActive: true, id: { ne: id } as any },
        { isActive: false }
      );
    }

    await this.resumeRepository.update(id, updateResumeDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const resume = await this.findOne(id);
    await this.resumeRepository.remove(resume);
  }

  async setActive(id: number): Promise<Resume> {
    const resume = await this.findOne(id);

    // Deactivate all other resumes
    await this.resumeRepository.update(
      { isActive: true },
      { isActive: false }
    );

    // Activate this resume
    await this.resumeRepository.update(id, { isActive: true });

    return await this.findOne(id);
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    byTemplate: Record<string, number>;
    recentCount: number;
  }> {
    const total = await this.resumeRepository.count();
    const active = await this.resumeRepository.count({ where: { isActive: true } });

    // Count by template
    const templateCounts = await this.resumeRepository
      .createQueryBuilder('resume')
      .select('resume.template', 'template')
      .addSelect('COUNT(*)', 'count')
      .groupBy('resume.template')
      .getRawMany();

    const byTemplate = {};
    templateCounts.forEach(item => {
      byTemplate[item.template] = parseInt(item.count);
    });

    // Count recent (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentCount = await this.resumeRepository.count({
      where: {
        createdAt: Between(thirtyDaysAgo, new Date())
      }
    });

    return {
      total,
      active,
      byTemplate,
      recentCount,
    };
  }

  async generatePDF(id: number, template: string = 'modern'): Promise<Buffer> {
    // TODO: Implement PDF generation with puppeteer
    throw new Error('PDF generation is temporarily disabled');

    /*
    const resume = await this.findOne(id);
    const html = this.generateHTMLTemplate(resume, template);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        }
      });

      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
    */
  }

  private generateHTMLTemplate(resume: Resume, template: string): string {
    switch (template) {
      case 'cyberpunk':
        return this.generateCyberpunkTemplate(resume);
      case 'classic':
        return this.generateClassicTemplate(resume);
      default:
        return this.generateModernTemplate(resume);
    }
  }

  private generateModernTemplate(resume: Resume): string {
    const { personalInfo, education, experience, skills, projects, languages, certifications } = resume;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${personalInfo.name} - Resume</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #3498db; }
          .name { font-size: 2.5em; font-weight: bold; color: #2c3e50; margin-bottom: 10px; }
          .title { font-size: 1.3em; color: #3498db; margin-bottom: 15px; }
          .contact { font-size: 0.9em; color: #666; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 1.3em; font-weight: bold; color: #2c3e50; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 1px solid #bdc3c7; }
          .summary { font-size: 1em; color: #555; text-align: justify; }
          .item { margin-bottom: 20px; }
          .item-header { font-weight: bold; color: #2c3e50; }
          .item-meta { color: #666; font-size: 0.9em; margin-bottom: 5px; }
          .item-description { color: #555; }
          .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
          .skill-category { background: #f8f9fa; padding: 15px; border-radius: 5px; }
          .skill-category-title { font-weight: bold; color: #2c3e50; margin-bottom: 8px; }
          .skills-list { color: #555; }
          .tech-tags { margin-top: 8px; }
          .tech-tag { display: inline-block; background: #3498db; color: white; padding: 2px 8px; margin: 2px; border-radius: 12px; font-size: 0.8em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="name">${personalInfo.name}</div>
            <div class="title">${personalInfo.title}</div>
            <div class="contact">
              ${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}
              ${personalInfo.website ? ` | ${personalInfo.website}` : ''}
              ${personalInfo.linkedin ? ` | ${personalInfo.linkedin}` : ''}
              ${personalInfo.github ? ` | ${personalInfo.github}` : ''}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="summary">${personalInfo.summary}</div>
          </div>

          ${experience && experience.length > 0 ? `
          <div class="section">
            <div class="section-title">Professional Experience</div>
            ${experience.map(exp => `
              <div class="item">
                <div class="item-header">${exp.title} - ${exp.company}</div>
                <div class="item-meta">${exp.location} | ${exp.startDate} - ${exp.endDate || 'Present'}</div>
                <div class="item-description">${exp.description}</div>
                ${exp.technologies && exp.technologies.length > 0 ? `
                  <div class="tech-tags">
                    ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                  </div>
                ` : ''}
                ${exp.achievements && exp.achievements.length > 0 ? `
                  <ul style="margin-top: 8px; margin-left: 20px;">
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${skills && skills.length > 0 ? `
          <div class="section">
            <div class="section-title">Technical Skills</div>
            <div class="skills-grid">
              ${skills.map(skillCategory => `
                <div class="skill-category">
                  <div class="skill-category-title">${skillCategory.category}</div>
                  <div class="skills-list">${skillCategory.skills.join(', ')}</div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          ${projects && projects.length > 0 ? `
          <div class="section">
            <div class="section-title">Featured Projects</div>
            ${projects.map(project => `
              <div class="item">
                <div class="item-header">${project.name}</div>
                <div class="item-description">${project.description}</div>
                <div class="tech-tags">
                  ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${project.url || project.github ? `
                  <div style="margin-top: 8px; color: #3498db;">
                    ${project.url ? `Live: ${project.url}` : ''}
                    ${project.url && project.github ? ' | ' : ''}
                    ${project.github ? `GitHub: ${project.github}` : ''}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${education && education.length > 0 ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${education.map(edu => `
              <div class="item">
                <div class="item-header">${edu.degree}</div>
                <div class="item-meta">${edu.school} | ${edu.year} ${edu.gpa ? `| GPA: ${edu.gpa}` : ''}</div>
                ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${languages && languages.length > 0 ? `
          <div class="section">
            <div class="section-title">Languages</div>
            <div class="skills-list">
              ${languages.map(lang => `${lang.name} (${lang.level})`).join(', ')}
            </div>
          </div>
          ` : ''}

          ${certifications && certifications.length > 0 ? `
          <div class="section">
            <div class="section-title">Certifications</div>
            ${certifications.map(cert => `
              <div class="item">
                <div class="item-header">${cert.name}</div>
                <div class="item-meta">${cert.issuer} | ${cert.date} ${cert.credentialId ? `| ID: ${cert.credentialId}` : ''}</div>
                ${cert.url ? `<div style="color: #3498db;">${cert.url}</div>` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }

  private generateCyberpunkTemplate(resume: Resume): string {
    const { personalInfo, education, experience, skills, projects, languages, certifications } = resume;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${personalInfo.name} - Cyberpunk Resume</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'JetBrains Mono', monospace; 
            background: #0a0a0a; 
            color: #00ffff; 
            line-height: 1.4; 
            font-size: 12px;
          }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .terminal-header { 
            background: #1a1a1a; 
            padding: 15px; 
            margin-bottom: 20px; 
            border: 1px solid #00ffff; 
            position: relative;
          }
          .terminal-header::before {
            content: "● ● ●";
            position: absolute;
            top: 8px;
            right: 15px;
            color: #666;
          }
          .name { 
            font-size: 24px; 
            font-weight: bold; 
            color: #00ffff; 
            text-transform: uppercase; 
            letter-spacing: 2px;
          }
          .title { font-size: 14px; color: #8b5cf6; margin: 5px 0; }
          .contact { font-size: 10px; color: #666; margin-top: 10px; }
          .section { 
            margin-bottom: 25px; 
            border: 1px solid #333; 
            background: #111; 
            padding: 15px;
          }
          .section-title { 
            font-size: 14px; 
            font-weight: bold; 
            color: #00ffff; 
            margin-bottom: 10px; 
            text-transform: uppercase;
            border-bottom: 1px solid #333;
            padding-bottom: 5px;
          }
          .section-title::before { content: "> "; color: #8b5cf6; }
          .summary { color: #ccc; text-align: justify; line-height: 1.5; }
          .item { margin-bottom: 15px; padding: 10px; background: #0d0d0d; border-left: 2px solid #8b5cf6; }
          .item-header { 
            font-weight: bold; 
            color: #00ffff; 
            font-size: 12px;
          }
          .item-meta { 
            color: #8b5cf6; 
            font-size: 10px; 
            margin: 3px 0; 
          }
          .item-description { color: #aaa; font-size: 11px; line-height: 1.4; }
          .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }
          .skill-category { 
            background: #0d0d0d; 
            padding: 10px; 
            border: 1px solid #333;
            border-left: 3px solid #00ffff;
          }
          .skill-category-title { 
            font-weight: bold; 
            color: #00ffff; 
            margin-bottom: 5px; 
            font-size: 11px;
          }
          .skills-list { color: #aaa; font-size: 10px; }
          .tech-tags { margin-top: 5px; }
          .tech-tag { 
            display: inline-block; 
            background: #8b5cf6; 
            color: #000; 
            padding: 1px 6px; 
            margin: 1px; 
            font-size: 9px; 
            font-weight: bold;
          }
          .terminal-line::before { content: "$ "; color: #8b5cf6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="terminal-header">
            <div class="name">${personalInfo.name}</div>
            <div class="title">[${personalInfo.title}]</div>
            <div class="contact terminal-line">
              CONTACT: ${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}
              ${personalInfo.website ? `\nWEB: ${personalInfo.website}` : ''}
              ${personalInfo.linkedin ? `\nLINKEDIN: ${personalInfo.linkedin}` : ''}
              ${personalInfo.github ? `\nGITHUB: ${personalInfo.github}` : ''}
            </div>
          </div>

          <div class="section">
            <div class="section-title">System Summary</div>
            <div class="summary">${personalInfo.summary}</div>
          </div>

          ${experience && experience.length > 0 ? `
          <div class="section">
            <div class="section-title">Runtime History</div>
            ${experience.map(exp => `
              <div class="item">
                <div class="item-header">${exp.title} @ ${exp.company}</div>
                <div class="item-meta">[${exp.location}] ${exp.startDate} - ${exp.endDate || 'ACTIVE'}</div>
                <div class="item-description">${exp.description}</div>
                ${exp.technologies && exp.technologies.length > 0 ? `
                  <div class="tech-tags">
                    ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                  </div>
                ` : ''}
                ${exp.achievements && exp.achievements.length > 0 ? `
                  <div style="margin-top: 8px; color: #8b5cf6; font-size: 10px;">
                    ${exp.achievements.map(achievement => `→ ${achievement}`).join('<br>')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${skills && skills.length > 0 ? `
          <div class="section">
            <div class="section-title">Installed Packages</div>
            <div class="skills-grid">
              ${skills.map(skillCategory => `
                <div class="skill-category">
                  <div class="skill-category-title">${skillCategory.category}</div>
                  <div class="skills-list">${skillCategory.skills.join(' | ')}</div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          ${projects && projects.length > 0 ? `
          <div class="section">
            <div class="section-title">Active Repositories</div>
            ${projects.map(project => `
              <div class="item">
                <div class="item-header">${project.name}</div>
                <div class="item-description">${project.description}</div>
                <div class="tech-tags">
                  ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${project.url || project.github ? `
                  <div style="margin-top: 5px; color: #8b5cf6; font-size: 10px;">
                    ${project.url ? `LIVE: ${project.url}` : ''}
                    ${project.url && project.github ? ' | ' : ''}
                    ${project.github ? `REPO: ${project.github}` : ''}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${education && education.length > 0 ? `
          <div class="section">
            <div class="section-title">System Configuration</div>
            ${education.map(edu => `
              <div class="item">
                <div class="item-header">${edu.degree}</div>
                <div class="item-meta">${edu.school} | ${edu.year} ${edu.gpa ? `| SCORE: ${edu.gpa}` : ''}</div>
                ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${languages && languages.length > 0 ? `
          <div class="section">
            <div class="section-title">Language Modules</div>
            <div class="skills-list">
              ${languages.map(lang => `${lang.name}:${lang.level}`).join(' | ')}
            </div>
          </div>
          ` : ''}

          ${certifications && certifications.length > 0 ? `
          <div class="section">
            <div class="section-title">Security Certificates</div>
            ${certifications.map(cert => `
              <div class="item">
                <div class="item-header">${cert.name}</div>
                <div class="item-meta">ISSUED_BY: ${cert.issuer} | DATE: ${cert.date} ${cert.credentialId ? `| ID: ${cert.credentialId}` : ''}</div>
                ${cert.url ? `<div style="color: #8b5cf6; font-size: 10px;">VERIFY: ${cert.url}</div>` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }

  private generateClassicTemplate(resume: Resume): string {
    // Classic template implementation would go here
    // For now, fall back to modern template
    return this.generateModernTemplate(resume);
  }
} 