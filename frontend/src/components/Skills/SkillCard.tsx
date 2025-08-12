import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Eye, Code, Database, Globe, Zap, Activity, Terminal, BarChart3 } from 'lucide-react';
import { Skill, SkillCategory } from '../../types';

interface SkillCardProps {
    skill: Skill;
    onClick?: (skill: Skill) => void;
    index?: number;
}

const skillCategoryIcons: Record<SkillCategory, any> = {
    frontend: Globe,
    backend: Database,
    database: Database,
    devops: Activity,
    'ai-ml': BarChart3,
    design: Zap,
    tools: Terminal,
};

const skillCategoryColors: Record<SkillCategory, string> = {
    frontend: 'neon-blue',
    backend: 'neon-pink',
    database: 'neon-cyan',
    devops: 'neon-purple',
    'ai-ml': 'neon-pink',
    design: 'neon-orange',
    tools: 'neon-green',
};

const skillCategoryGradients: Record<SkillCategory, string> = {
    frontend: 'bg-gradient-to-r from-blue-500 to-green-400',
    backend: 'bg-gradient-to-r from-pink-500 to-green-400',
    database: 'bg-gradient-to-r from-cyan-500 to-green-400',
    devops: 'bg-gradient-to-r from-purple-500 to-green-400',
    'ai-ml': 'bg-gradient-to-r from-pink-500 to-purple-400',
    design: 'bg-gradient-to-r from-orange-500 to-green-400',
    tools: 'bg-gradient-to-r from-green-500 to-green-300',
};

const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick, index = 0 }) => {
    const CategoryIcon = skillCategoryIcons[skill.category] || Code;
    const categoryColor = skillCategoryColors[skill.category] || 'neon-green';
    const categoryGradient = skillCategoryGradients[skill.category] || 'bg-gradient-to-r from-green-500 to-green-300';

    const getSkillLevelLabel = (level: number) => {
        if (level >= 4) return 'EXPERT';
        if (level >= 3) return 'ADVANCED';
        if (level >= 2) return 'INTERMEDIATE';
        return 'BEGINNER';
    };

    const getSkillLevelColor = (level: number) => {
        if (level >= 4) return 'text-neon-green';
        if (level >= 3) return 'text-neon-blue';
        if (level >= 2) return 'text-neon-cyan';
        return 'text-neon-pink';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            onClick={() => onClick && onClick(skill)}
            className="cyber-card p-6 cursor-pointer hover:border-neon-green transition-all duration-300 group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded bg-gray-800 text-${categoryColor} group-hover:animate-pulse`}>
                        <CategoryIcon size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors">
                            {skill.name}
                        </h3>
                        <p className="text-gray-400 text-sm uppercase tracking-wider">
                            {skill.category}
                        </p>
                    </div>
                </div>
                <ChevronRight size={16} className="text-gray-500 group-hover:text-neon-green transition-colors" />
            </div>

            {/* Skill Level Bar */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">PROFICIENCY</span>
                    <span className={`text-sm font-bold ${getSkillLevelColor(skill.level)}`}>
                        {getSkillLevelLabel(skill.level)} ({skill.level}/4)
                    </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        style={{ width: `${skill.level * 25}%` }}
                        className={`h-2 origin-left rounded-full bg-neon-green`}
                    />
                </div>
            </div>

            {/* Description */}
            {skill.description && (
                <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                    {skill.description}
                </p>
            )}

            {/* Tags */}
            <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                    {skill.yearsOfExperience && (
                        <span className="px-2 py-1 text-xs bg-gray-800 text-neon-cyan rounded border">
                            {skill.yearsOfExperience}y exp
                        </span>
                    )}
                    {skill.category && (
                        <span className={`px-2 py-1 text-xs bg-gray-800 text-${categoryColor} rounded border`}>
                            {skill.category.toUpperCase()}
                        </span>
                    )}
                </div>
                <Eye size={14} className="text-gray-500 group-hover:text-neon-green transition-colors" />
            </div>
        </motion.div>
    );
};

export default SkillCard; 