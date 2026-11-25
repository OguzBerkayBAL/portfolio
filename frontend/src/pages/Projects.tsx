import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Search, Code, Star, X, Loader } from 'lucide-react';
import { Project, ProjectStatus } from '../types';
import DecodeText from '../components/DecodeText';

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
            const cacheBuster = Date.now();
            const res = await fetch(`/data/projects.json?v=${cacheBuster}`);
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

    const statusLabel = (status: ProjectStatus) => {
        switch (status) {
            case ProjectStatus.COMPLETED: return 'done';
            case ProjectStatus.IN_PROGRESS: return 'wip';
            case ProjectStatus.PLANNING: return 'planned';
            case ProjectStatus.ARCHIVED: return 'archived';
            default: return String(status);
        }
    };

    const slug = (project: Project) => project.id.replace(/^proj-/, '');

    const filteredProjects = filterProjects();
    const isFiltered = Boolean(searchTerm || selectedStatus || selectedTech || showFeaturedOnly);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center font-mono">
                    <Loader className="w-8 h-8 text-matrix-400 animate-spin mx-auto mb-4" />
                    <div className="text-matrix-400 cursor-block">$ ls ~/projects</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="terminal-window p-8 text-center font-mono max-w-md">
                    <p className="text-pill-red mb-2">error: {error}</p>
                    <p className="text-dark-muted mb-6 text-sm">projects.json okunamadı</p>
                    <button onClick={loadProjects} className="cyber-button">
                        retry
                    </button>
                </div>
            </div>
        );
    }

    const LiveBadge = () => (
        <span className="flex items-center gap-1.5 text-pill-red font-bold tracking-wider">
            <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-pill-red opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-pill-red" />
            </span>
            LIVE
        </span>
    );

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Başlık */}
                <motion.header
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 font-mono"
                >
                    <p className="text-sm text-matrix-600 mb-3">
                        <span className="text-matrix-400">~/projects</span> $ ls -la
                    </p>
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
                        <DecodeText text="Projects" className="phosphor-text" />
                    </h1>
                    <p className="text-dark-muted text-sm sm:text-base">
                        <span className="text-matrix-100">{projects.length}</span> proje ·{' '}
                        <span className="text-matrix-100">{projects.filter(p => p.liveUrl).length}</span> canlıda ·{' '}
                        <span className="text-matrix-100">{projects.filter(p => p.status === ProjectStatus.COMPLETED).length}</span> tamamlandı ·{' '}
                        <span className="text-matrix-100">{allTechnologies.length}</span> teknoloji
                    </p>
                </motion.header>

                {/* Filtreler */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="terminal-window mb-10 font-mono"
                >
                    <div className="terminal-window__bar">
                        <span>~/projects/filter</span>
                        <span>{filteredProjects.length} sonuç</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-3 p-4">
                        <div className="relative">
                            <Search className="w-4 h-4 text-matrix-600 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="grep projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-dark-bg border border-dark-border rounded-sm text-matrix-50 placeholder-matrix-700 focus:border-matrix-400 focus:outline-none text-sm"
                            />
                        </div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus | '')}
                            className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-sm text-matrix-50 focus:border-matrix-400 focus:outline-none text-sm"
                        >
                            <option value="">--status=all</option>
                            <option value={ProjectStatus.COMPLETED}>--status=done</option>
                            <option value={ProjectStatus.IN_PROGRESS}>--status=wip</option>
                            <option value={ProjectStatus.PLANNING}>--status=planned</option>
                            <option value={ProjectStatus.ARCHIVED}>--status=archived</option>
                        </select>
                        <select
                            value={selectedTech}
                            onChange={(e) => setSelectedTech(e.target.value)}
                            className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-sm text-matrix-50 focus:border-matrix-400 focus:outline-none text-sm"
                        >
                            <option value="">--tech=all</option>
                            {allTechnologies.map(tech => (
                                <option key={tech} value={tech}>--tech={tech}</option>
                            ))}
                        </select>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-matrix-100 select-none px-1">
                            <input
                                type="checkbox"
                                checked={showFeaturedOnly}
                                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                                className="sr-only peer"
                            />
                            <span className="w-4 h-4 border border-matrix-400 flex items-center justify-center text-[10px] leading-none text-black peer-checked:bg-matrix-400 peer-focus-visible:ring-2 peer-focus-visible:ring-matrix-400">
                                {showFeaturedOnly ? '✓' : ''}
                            </span>
                            --featured
                        </label>
                    </div>
                </motion.div>

                {/* Kartlar */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-16 font-mono">
                        <p className="text-matrix-400 mb-2">grep: eşleşen proje yok</p>
                        <p className="text-dark-muted text-sm">Filtreleri değiştirmeyi dene.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                        {filteredProjects.map((project, index) => {
                            const hero = !isFiltered && index < 2 && project.featured;
                            return (
                                <motion.article
                                    key={project.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.06 }}
                                    className={`terminal-window group cursor-pointer flex flex-col font-mono transition-colors hover:border-matrix-600 ${hero ? 'lg:col-span-3' : 'lg:col-span-2'}`}
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="terminal-window__bar">
                                        <span className="truncate">
                                            ~/projects/<span className="text-matrix-100">{slug(project)}</span>
                                        </span>
                                        {project.liveUrl ? <LiveBadge /> : <span>{statusLabel(project.status)}</span>}
                                    </div>

                                    <div className={`portrait relative ${hero ? 'h-56 lg:h-64' : 'h-44'} bg-dark-bg border-b border-dark-border`}>
                                        {project.imageUrl ? (
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-[1.03] !transition-[filter,transform] duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.08),transparent_70%)]">
                                                <Code className="w-10 h-10 text-matrix-400" />
                                                <span className="text-xs text-matrix-600">no_preview.png</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col p-5">
                                        <h3 className="flex items-center gap-2 text-lg font-bold text-matrix-50 mb-2 group-hover:text-matrix-400 transition-colors">
                                            {project.title}
                                            {project.featured && <Star className="w-3.5 h-3.5 text-matrix-400" fill="currentColor" aria-label="featured" />}
                                        </h3>
                                        <p className="text-sm text-[#a9c9b1] leading-relaxed mb-4 flex-1">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 text-xs text-matrix-600">
                                            {project.technologies.slice(0, hero ? 6 : 4).map((tech) => (
                                                <span key={tech}>#{tech.toLowerCase().replace(/\s+/g, '-')}</span>
                                            ))}
                                            {project.technologies.length > (hero ? 6 : 4) && (
                                                <span>+{project.technologies.length - (hero ? 6 : 4)}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-xs pt-3 border-t border-dark-border">
                                            <div className="flex gap-4">
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center gap-1 text-matrix-400 hover:text-matrix-50 transition-colors"
                                                    >
                                                        [ live <ExternalLink className="w-3 h-3" /> ]
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center gap-1 text-dark-muted hover:text-matrix-400 transition-colors"
                                                    >
                                                        [ src <Github className="w-3 h-3" /> ]
                                                    </a>
                                                )}
                                            </div>
                                            <span className="text-dark-muted group-hover:text-matrix-400 transition-colors">
                                                cat README →
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                )}

                {/* Proje detayı */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 16, opacity: 0 }}
                                role="dialog"
                                aria-modal="true"
                                aria-label={selectedProject.title}
                                className="terminal-window bg-dark-bg max-w-3xl w-full max-h-[90vh] overflow-y-auto font-mono"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="terminal-window__bar sticky top-0 bg-dark-bg z-10">
                                    <span>~/projects/{slug(selectedProject)}/README.md</span>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="text-dark-muted hover:text-matrix-400 transition-colors"
                                        aria-label="Kapat"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {selectedProject.imageUrl && (
                                    <img
                                        src={selectedProject.imageUrl}
                                        alt={selectedProject.title}
                                        className="w-full h-56 sm:h-72 object-cover border-b border-dark-border"
                                    />
                                )}

                                <div className="p-6 sm:p-8">
                                    <div className="flex flex-wrap items-center gap-3 mb-2 text-xs text-dark-muted">
                                        {selectedProject.liveUrl ? <LiveBadge /> : <span>status: {statusLabel(selectedProject.status)}</span>}
                                        <span>· {new Date(selectedProject.createdAt).getFullYear()}</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight phosphor-text mb-6">
                                        # {selectedProject.title}
                                    </h2>

                                    <p className="text-[#b9d9c0] leading-relaxed mb-8">
                                        {selectedProject.longDescription || selectedProject.description}
                                    </p>

                                    <p className="text-sm text-matrix-600 mb-3">## stack</p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {selectedProject.technologies.map((tech) => (
                                            <span key={tech} className="px-2.5 py-1 border border-dark-border text-matrix-300 text-xs rounded-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {selectedProject.liveUrl && (
                                            <a
                                                href={selectedProject.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-pill-red text-black font-bold uppercase tracking-wider text-sm rounded-sm hover:shadow-[0_0_24px_rgba(255,42,61,0.45)] transition-shadow"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Canlı siteyi aç
                                            </a>
                                        )}
                                        {selectedProject.githubUrl && (
                                            <a
                                                href={selectedProject.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-matrix-400 text-matrix-400 uppercase tracking-wider text-sm rounded-sm hover:bg-matrix-400 hover:text-black transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                Kaynak kod
                                            </a>
                                        )}
                                    </div>
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
