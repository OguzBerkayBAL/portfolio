// Import entities
import { Project, ProjectStatus } from './project.entity';
import { Skill, SkillCategory, SkillLevel } from './skill.entity';
import { Experience } from './experience.entity';
import { BlogPost } from './blog-post.entity';
import { ContactMessage, MessageStatus } from './contact-message.entity';
import { Resume } from './resume.entity';
import { User, UserRole, UserStatus } from './user.entity';

// Export all entities for easy imports
export { Project, ProjectStatus } from './project.entity';
export { Skill, SkillCategory, SkillLevel } from './skill.entity';
export { Experience } from './experience.entity';
export { BlogPost } from './blog-post.entity';
export { ContactMessage, MessageStatus } from './contact-message.entity';
export { Resume } from './resume.entity';
export { User, UserRole, UserStatus } from './user.entity';

// Array of all entities for TypeORM configuration
export const entities = [
    Project,
    Skill,
    Experience,
    BlogPost,
    ContactMessage,
    Resume,
    User,
]; 