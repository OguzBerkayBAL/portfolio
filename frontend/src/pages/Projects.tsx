import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    ExternalLink,
    Search,
    Filter,
    Eye,
    Code,
    Rocket,
    Star,
    Calendar,
    Tag,
    X,
    Loader
} from 'lucide-react';
import { Project, ProjectStatus } from '../types';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | ''>('');
    const [selectedTech, setSelectedTech] = useState<string>('');
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // All unique technologies from projects
    const [allTechnologies, setAllTechnologies] = useState<string[]>([]);

    useEffect(() => {
        loadProjects();
    }, []);

    // filteredProjects türetilen değer; ekstra effect'e gerek yok

    const loadProjects = async () => {
        try {
            setLoading(true);
            const res = await fetch('/data/projects.json');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = (await res.json()) as Project[];
            setProjects(data);

            // Featured
            setFeaturedProjects(data.filter((p) => p.featured));

            // Extract all unique technologies
            const techSet = new Set<string>();
            data.forEach(project => {
                if (Array.isArray(project.technologies)) {
                    project.technologies.forEach(tech => techSet.add(tech));
                } else {
                    console.warn('⚠️ Technologies is not an array for project:', project.title, project.technologies);
                }
            });
            setAllTechnologies(Array.from(techSet).sort());
        } catch (err) {
            setError('Failed to load projects');
            console.error('Error loading projects:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterProjects = () => {
        let filtered = showFeaturedOnly ? featuredProjects : projects;

        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedStatus) {
            filtered = filtered.filter(project => project.status === selectedStatus);
        }

        if (selectedTech) {
            filtered = filtered.filter(project =>
                project.technologies.includes(selectedTech)
            );
        }

        return filtered;
    };

    const getStatusColor = (status: ProjectStatus) => {
        switch (status) {
            case ProjectStatus.COMPLETED: return 'text-neon-green';
            case ProjectStatus.IN_PROGRESS: return 'text-neon-blue';
            case ProjectStatus.PLANNING: return 'text-neon-pink';
            case ProjectStatus.ARCHIVED: return 'text-gray-500';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = (status: ProjectStatus) => {
        switch (status) {
            case ProjectStatus.COMPLETED: return '✅';
            case ProjectStatus.IN_PROGRESS: return '🚧';
            case ProjectStatus.PLANNING: return '📋';
            case ProjectStatus.ARCHIVED: return '📦';
            default: return '❓';
        }
    };

    const filteredProjects = filterProjects();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-neon-blue animate-spin mx-auto mb-4" />
                    <div className="text-xl font-mono text-neon-blue">
                        Loading projects from matrix...
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                        [ ACCESSING PROJECT DATABASE ]
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="cyber-card p-8 text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-neon-pink mb-2">
                        CONNECTION ERROR
                    </h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={loadProjects}
                        className="cyber-button"
                    >
                        RETRY CONNECTION
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl font-cyber font-bold mb-4">
                        <span className="text-neon-blue">PROJECTS</span>
                        <span className="text-neon-pink"> MATRIX</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-mono mb-8">
                        Elite applications & experimental technologies
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                        <motion.div
                            className="cyber-card text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Code className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                            <div className="text-lg font-bold text-neon-green">{projects.length}</div>
                            <div className="text-xs text-gray-400 font-mono">Total</div>
                        </motion.div>
                        <motion.div
                            className="cyber-card text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Star className="w-6 h-6 text-neon-pink mx-auto mb-2" />
                            <div className="text-lg font-bold text-neon-green">{featuredProjects.length}</div>
                            <div className="text-xs text-gray-400 font-mono">Featured</div>
                        </motion.div>
                        <motion.div
                            className="cyber-card text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Rocket className="w-6 h-6 text-neon-green mx-auto mb-2" />
                            <div className="text-lg font-bold text-neon-green">
                                {projects.filter(p => p.status === ProjectStatus.COMPLETED).length}
                            </div>
                            <div className="text-xs text-gray-400 font-mono">Completed</div>
                        </motion.div>
                        <motion.div
                            className="cyber-card text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Tag className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                            <div className="text-lg font-bold text-neon-green">{allTechnologies.length}</div>
                            <div className="text-xs text-gray-400 font-mono">Technologies</div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="cyber-card p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Filter className="w-5 h-5 text-neon-blue" />
                            <span className="font-mono text-neon-blue uppercase">Matrix Filters</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none"
                                />
                            </div>

                            {/* Status Filter */}
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus | '')}
                                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded text-white focus:border-neon-blue focus:outline-none"
                            >
                                <option value="">All Status</option>
                                <option value={ProjectStatus.COMPLETED}>✅ Completed</option>
                                <option value={ProjectStatus.IN_PROGRESS}>🚧 In Progress</option>
                                <option value={ProjectStatus.PLANNING}>📋 Planning</option>
                                <option value={ProjectStatus.ARCHIVED}>📦 Archived</option>
                            </select>

                            {/* Technology Filter */}
                            <select
                                value={selectedTech}
                                onChange={(e) => setSelectedTech(e.target.value)}
                                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded text-white focus:border-neon-blue focus:outline-none"
                            >
                                <option value="">All Technologies</option>
                                {allTechnologies.map(tech => (
                                    <option key={tech} value={tech}>{tech}</option>
                                ))}
                            </select>

                            {/* Featured Toggle */}
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showFeaturedOnly}
                                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${showFeaturedOnly ? 'bg-neon-pink' : 'bg-gray-600'
                                    }`}>
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${showFeaturedOnly ? 'translate-x-6' : 'translate-x-0'
                                        }`} />
                                </div>
                                <span className="text-sm font-mono text-gray-300">Featured Only</span>
                            </label>
                        </div>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-mono text-gray-400 mb-2">
                                No projects found in matrix
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your search filters
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="cyber-card group cursor-pointer h-full flex flex-col"
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    onClick={() => setSelectedProject(project)}
                                >
                                    {/* Project Image */}
                                    <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-dark-bg">
                                        {project.imageUrl ? (
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-blue/20 to-neon-pink/20">
                                                <Code className="w-16 h-16 text-neon-blue opacity-50" />
                                            </div>
                                        )}

                                        {/* Status Badge */}
                                        <div className="absolute top-2 right-2">
                                            <span className={`px-2 py-1 rounded text-xs font-mono ${getStatusColor(project.status)} bg-black/80`}>
                                                {getStatusIcon(project.status)} {project.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Featured Badge */}
                                        {project.featured && (
                                            <div className="absolute top-2 left-2">
                                                <Star className="w-5 h-5 text-neon-pink" fill="currentColor" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Project Info */}
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm mb-4 flex-1">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="tech-container mb-4">
                                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                                <span
                                                    key={`${tech}-${techIndex}`}
                                                    className="tech-tag px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded font-mono"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="tech-tag px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded font-mono">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Links */}
                                        <div className="flex justify-between items-center">
                                            <div className="flex space-x-2">
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 rounded bg-dark-border hover:bg-neon-blue/20 text-gray-400 hover:text-neon-blue transition-colors"
                                                    >
                                                        <Github className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 rounded bg-dark-border hover:bg-neon-green/20 text-gray-400 hover:text-neon-green transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>

                                            <button className="flex items-center space-x-1 text-xs font-mono text-gray-400 hover:text-neon-pink transition-colors">
                                                <Eye className="w-4 h-4" />
                                                <span>VIEW</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Project Detail Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="cyber-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-cyber font-bold text-neon-blue mb-2">
                                            {selectedProject.title}
                                        </h2>
                                        <div className="flex items-center space-x-4">
                                            <span className={`text-sm font-mono ${getStatusColor(selectedProject.status)}`}>
                                                {getStatusIcon(selectedProject.status)} {selectedProject.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                            {selectedProject.featured && (
                                                <span className="flex items-center space-x-1 text-neon-pink text-sm">
                                                    <Star className="w-4 h-4" fill="currentColor" />
                                                    <span>FEATURED</span>
                                                </span>
                                            )}
                                            <span className="text-sm text-gray-400 flex items-center space-x-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(selectedProject.createdAt).toLocaleDateString()}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="p-2 rounded hover:bg-dark-border text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Project Image */}
                                {selectedProject.imageUrl && (
                                    <div className="mb-6">
                                        <img
                                            src={selectedProject.imageUrl}
                                            alt={selectedProject.title}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-neon-green mb-3">Description</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {selectedProject.longDescription || selectedProject.description}
                                    </p>
                                </div>

                                {/* Technologies */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-neon-green mb-3">Technologies</h3>
                                    <div className="tech-container">
                                        {selectedProject.technologies.map((tech, techIndex) => (
                                            <span
                                                key={`modal-${tech}-${techIndex}`}
                                                className="tech-tag px-3 py-2 bg-neon-blue/20 text-neon-blue rounded font-mono text-sm border border-neon-blue/30"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex space-x-4">
                                    {selectedProject.githubUrl && (
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cyber-button flex items-center space-x-2"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span>SOURCE CODE</span>
                                        </a>
                                    )}
                                    {selectedProject.liveUrl && (
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-neon-green text-black font-mono uppercase tracking-wider hover:bg-neon-green/80 transition-colors flex items-center space-x-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>LIVE DEMO</span>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Projects; 