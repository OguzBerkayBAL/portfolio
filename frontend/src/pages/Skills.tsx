import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Code, Database, Globe, Zap, ChevronRight, Terminal, Activity, X, Eye, BarChart3 } from 'lucide-react';
import apiService from '../services/api';
import { Skill, SkillCategory } from '../types';

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'ALL'>('ALL');
    const [minLevel, setMinLevel] = useState(1);

    // UI states
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [stats, setStats] = useState<any>(null);

    const skillCategories = [
        { value: 'ALL', label: 'ALL SYSTEMS', icon: Terminal, color: 'neon-green' },
        { value: 'frontend', label: 'FRONTEND', icon: Globe, color: 'neon-blue' },
        { value: 'backend', label: 'BACKEND', icon: Database, color: 'neon-pink' },
        { value: 'database', label: 'DATABASE', icon: Database, color: 'neon-cyan' },
        { value: 'devops', label: 'DEVOPS', icon: Activity, color: 'neon-purple' },
        { value: 'design', label: 'DESIGN', icon: Zap, color: 'neon-orange' },
        { value: 'tools', label: 'TOOLS', icon: Terminal, color: 'neon-green' }
    ];

    const getCategoryIcon = (category: SkillCategory) => {
        const categoryData = skillCategories.find(cat => cat.value === category);
        return categoryData?.icon || Code;
    };

    const getCategoryColor = (category: SkillCategory) => {
        const categoryData = skillCategories.find(cat => cat.value === category);
        return categoryData?.color || 'neon-green';
    };

    useEffect(() => {
        fetchSkills();
        fetchStats();
    }, []);

    const applyFilters = React.useCallback(() => {
        let filtered = skills;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(skill =>
                skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (skill.description && skill.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Category filter
        if (selectedCategory !== 'ALL') {
            filtered = filtered.filter(skill => skill.category === selectedCategory);
        }

        // Level filter
        filtered = filtered.filter(skill => skill.level >= minLevel);

        setFilteredSkills(filtered);
    }, [skills, searchTerm, selectedCategory, minLevel]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const fetchSkills = async () => {
        try {
            setLoading(true);
            const response = await apiService.getSkills({ limit: 100 });
            setSkills(response.data);
        } catch (err: any) {
            setError('Neural matrix connection failed: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const statsData = await apiService.getSkillStats();
            setStats(statsData);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

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

    const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
        const CategoryIcon = getCategoryIcon(skill.category);
        const categoryColor = getCategoryColor(skill.category);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                onClick={() => setSelectedSkill(skill)}
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
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level * 25}%` }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className={`h-2 rounded-full bg-gradient-to-r from-${categoryColor} to-neon-green`}
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

    const SkillDetailModal: React.FC<{ skill: Skill; onClose: () => void }> = ({ skill, onClose }) => {
        const CategoryIcon = getCategoryIcon(skill.category);
        const categoryColor = getCategoryColor(skill.category);

        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="cyber-card p-8 max-w-2xl w-full max-h-96 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded bg-gray-800 text-${categoryColor}`}>
                                    <CategoryIcon size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{skill.name}</h2>
                                    <p className="text-gray-400 uppercase tracking-wider">{skill.category}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Proficiency Level */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-neon-green mb-3">PROFICIENCY LEVEL</h3>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400">Level</span>
                                        <span className={`font-bold ${getSkillLevelColor(skill.level)}`}>
                                            {skill.level}/4 - {getSkillLevelLabel(skill.level)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full bg-gradient-to-r from-${categoryColor} to-neon-green`}
                                            style={{ width: `${skill.level * 25}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {skill.description && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-neon-blue mb-3">DESCRIPTION</h3>
                                <p className="text-gray-300 leading-relaxed">{skill.description}</p>
                            </div>
                        )}

                        {/* Experience */}
                        {skill.yearsOfExperience && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-neon-pink mb-3">EXPERIENCE</h3>
                                <p className="text-gray-300">
                                    <span className="text-neon-cyan font-bold">{skill.yearsOfExperience}</span> years of hands-on experience
                                </p>
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-700">
                            <div>
                                <span className="text-gray-400 text-sm">Category:</span>
                                <span className={`ml-2 text-${categoryColor} font-mono`}>{skill.category.toUpperCase()}</span>
                            </div>
                            <div>
                                <span className="text-gray-400 text-sm">Skill ID:</span>
                                <span className="ml-2 text-gray-300 font-mono text-xs">{skill.id}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={onClose}
                                className="cyber-button px-8"
                            >
                                CLOSE NEURAL NODE
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="flex items-center justify-center min-h-96">
                    <div className="cyber-loading-container">
                        <div className="cyber-loading-spinner"></div>
                        <div className="text-neon-green font-mono mt-4">
                            [ SCANNING NEURAL MATRIX... ]
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="cyber-card p-8 text-center">
                    <div className="text-red-400 text-xl font-mono mb-4">
                        ⚠️ MATRIX CONNECTION ERROR
                    </div>
                    <p className="text-gray-300">{error}</p>
                    <button
                        onClick={fetchSkills}
                        className="cyber-button mt-4"
                    >
                        RETRY CONNECTION
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-6xl font-cyber font-bold mb-4">
                    <span className="text-neon-green glitch" data-text="SKILL">SKILL</span>
                    <span className="text-neon-blue glitch" data-text=" MATRIX"> MATRIX</span>
                </h1>
                <p className="text-xl text-gray-300 font-mono max-w-2xl mx-auto">
                    Neural pathways active. Technology skills loaded and operational.
                </p>

                {/* Stats Bar */}
                {stats && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-6 mt-8"
                    >
                        <div className="cyber-card p-4 w-full sm:min-w-40">
                            <div className="text-neon-green text-2xl font-bold">{stats.total || skills.length}</div>
                            <div className="text-gray-400 text-sm">TOTAL SKILLS</div>
                        </div>
                        <div className="cyber-card p-4 w-full sm:min-w-40">
                            <div className="text-neon-blue text-2xl font-bold">{stats.expertSkills || skills.filter(s => s.level >= 4).length}</div>
                            <div className="text-gray-400 text-sm">EXPERT LEVEL</div>
                        </div>
                        <div className="cyber-card p-4 w-full sm:min-w-40">
                            <div className="text-neon-pink text-2xl font-bold">{stats.averageLevel || (skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length) : 0)}</div>
                            <div className="text-gray-400 text-sm">AVG LEVEL</div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-8"
            >
                <div className="cyber-card p-6">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="cyber-button-small flex items-center space-x-2"
                        >
                            <Filter size={16} />
                            <span>NEURAL FILTERS</span>
                        </button>

                        {/* Quick category buttons */}
                        <div className="flex flex-wrap gap-2">
                            {skillCategories.map(category => {
                                const Icon = category.icon;
                                const isActive = selectedCategory === category.value;
                                return (
                                    <button
                                        key={category.value}
                                        onClick={() => setSelectedCategory(category.value as any)}
                                        className={`px-3 py-1 text-sm rounded border transition-all duration-300 flex items-center space-x-1 ${isActive
                                            ? `bg-${category.color} bg-opacity-20 border-${category.color} text-${category.color}`
                                            : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'
                                            }`}
                                    >
                                        <Icon size={14} />
                                        <span>{category.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Extended Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-gray-700 pt-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Search */}
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">SEARCH NEURAL PATHS</label>
                                        <div className="relative">
                                            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                placeholder="Search skills..."
                                                className="cyber-input pl-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Min Level */}
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">MINIMUM LEVEL: {minLevel}</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="4"
                                            value={minLevel}
                                            onChange={(e) => setMinLevel(Number(e.target.value))}
                                            className="cyber-slider w-full"
                                        />
                                    </div>

                                    {/* Results Count */}
                                    <div className="flex items-end">
                                        <div className="cyber-card p-3 w-full">
                                            <div className="text-neon-green text-lg font-bold">{filteredSkills.length}</div>
                                            <div className="text-gray-400 text-sm">SKILLS FOUND</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredSkills.map((skill, index) => (
                    <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                        <SkillCard skill={skill} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredSkills.length === 0 && !loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <div className="cyber-card p-8 max-w-md mx-auto">
                        <BarChart3 size={48} className="text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-400 mb-2">NO SKILLS DETECTED</h3>
                        <p className="text-gray-500">
                            Neural matrix scan complete. Adjust filters to expand search parameters.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('ALL');
                                setMinLevel(1);
                            }}
                            className="cyber-button mt-4"
                        >
                            RESET NEURAL FILTERS
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Skill Detail Modal */}
            {selectedSkill && (
                <SkillDetailModal
                    skill={selectedSkill}
                    onClose={() => setSelectedSkill(null)}
                />
            )}
        </div>
    );
};

export default Skills; 