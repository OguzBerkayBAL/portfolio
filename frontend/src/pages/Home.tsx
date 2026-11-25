import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DecodeText from '../components/DecodeText';
import TypingTerminal from '../components/TypingTerminal';
import { Project } from '../types';
import {
    Rocket,
    Zap,
    Terminal,
    ExternalLink,
    Download
} from 'lucide-react';

// Yeşil fosfor tonlu portre; fare üzerine gelince gerçek renklere döner
const Portrait: React.FC<{ imageError: boolean; onError: () => void; size: string }> = ({ imageError, onError, size }) => (
    <div className={`corner-brackets ${size}`}>
        <span className="cb tl" />
        <span className="cb tr" />
        <span className="cb bl" />
        <span className="cb br" />
        <div className="portrait w-full h-full border border-dark-border bg-dark-card">
            {!imageError ? (
                <img
                    src="/profile.jpg"
                    alt="Oğuz Berkay BAL"
                    className="w-full h-full object-cover"
                    onError={onError}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-matrix-400 font-mono text-4xl">
                    ?
                </div>
            )}
        </div>
    </div>
);

// "https://www.corydellatravel.com/" -> "corydellatravel.com", App Store linkleri -> "App Store"
const hostLabel = (url = '') => {
    try {
        const host = new URL(url).hostname.replace(/^www\./, '');
        return host === 'apps.apple.com' ? 'App Store' : host;
    } catch {
        return url;
    }
};

const Home: React.FC = () => {
    const [imageError, setImageError] = useState(false);
    const [liveProjects, setLiveProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/data/projects.json')
            .then((r) => (r.ok ? r.json() : []))
            .then((data: Project[]) => setLiveProjects(data.filter((p) => p.liveUrl)))
            .catch(() => setLiveProjects([]));
    }, []);
    const handleNavClick = () => {
        // Navigation tıklandığında scroll pozisyonunu sıfırla
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative pt-24 pb-16">
                <motion.div
                    className="container mx-auto px-4 relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-12 lg:gap-20 max-w-6xl mx-auto">

                        {/* Sol taraf: kimlik + terminal */}
                        <motion.div variants={itemVariants} className="w-full md:w-3/5 text-center md:text-left">
                            <motion.p variants={itemVariants} className="matrix-only font-mono text-sm text-matrix-600 mb-4">
                                <span className="text-matrix-400">~/oguzberkay</span> $ whoami
                            </motion.p>

                            <motion.h1
                                variants={itemVariants}
                                className="font-mono font-extrabold tracking-tight leading-[0.95] text-5xl sm:text-6xl lg:text-7xl mb-5"
                            >
                                <DecodeText text="Oğuz Berkay" className="phosphor-text block" delay={300} />
                                <DecodeText text="BAL" className="text-matrix-100 block" delay={700} />
                            </motion.h1>

                            <motion.p variants={itemVariants} className="font-mono text-lg sm:text-xl text-matrix-100 mb-2">
                                Full Stack Developer
                            </motion.p>
                            <motion.p variants={itemVariants} className="font-mono text-sm text-dark-muted mb-8">
                                TypeScript · NestJS · React / Next.js · React Native · PostgreSQL
                            </motion.p>

                            {/* Mobilde portre */}
                            <motion.div variants={itemVariants} className="flex md:hidden justify-center mb-10">
                                <Portrait imageError={imageError} onError={() => setImageError(true)} size="w-[220px] h-[264px]" />
                            </motion.div>

                            {/* Terminal penceresi */}
                            <motion.div variants={itemVariants} className="mb-8">
                                <TypingTerminal
                                    title="~/oguzberkay — zsh"
                                    steps={[
                                        {
                                            command: 'cat about.md',
                                            output: (
                                                <div className="space-y-2">
                                                    <p>
                                                        <span className="text-matrix-400">&gt;</span> Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği mezunuyum.
                                                    </p>
                                                    <p>
                                                        <span className="text-matrix-400">&gt;</span> TypeScript, NestJS, React/Next.js, React Native (Expo) ve PostgreSQL ile web ve mobil ürünleri tasarımdan canlıya kadar uçtan uca geliştiriyorum.
                                                    </p>
                                                    <p>
                                                        <span className="text-matrix-400">&gt;</span> Docker ile dağıtım, migration tabanlı veritabanı yönetimi, otomatik testler ve LLM / RAG entegrasyonu üzerine çalışıyorum.
                                                    </p>
                                                </div>
                                            ),
                                        },
                                        {
                                            command: 'ls ~/projects --live',
                                            output: (
                                                <ul className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                                                    {liveProjects.map((p) => (
                                                        <li key={p.id} className="contents">
                                                            <span className="text-matrix-100">{p.id.replace(/^proj-/, '')}/</span>
                                                            <a
                                                                href={p.liveUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-matrix-400 hover:text-matrix-50 underline decoration-matrix-700 underline-offset-4 mb-2 sm:mb-0 truncate"
                                                            >
                                                                {hostLabel(p.liveUrl)} ↗
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ),
                                        },
                                    ]}
                                />
                            </motion.div>

                            {/* CTA */}
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center md:justify-start font-mono">
                                <Link to="/projects" onClick={handleNavClick}>
                                    <motion.span
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-pill-red text-black font-bold uppercase tracking-wider rounded-sm hover:shadow-[0_0_28px_rgb(var(--pill)/0.45)] transition-shadow"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <Rocket className="w-4 h-4" />
                                        Explore projects
                                    </motion.span>
                                </Link>

                                <motion.a
                                    href="/BerkayCV.pdf"
                                    download="BerkayCV.pdf"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-matrix-400 text-matrix-400 uppercase tracking-wider rounded-sm hover:bg-matrix-400 hover:text-black transition-colors"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </motion.a>

                                <Link
                                    to="/contact"
                                    onClick={handleNavClick}
                                    className="inline-flex items-center gap-2 px-4 py-3 text-matrix-100 uppercase tracking-wider hover:text-matrix-400 transition-colors"
                                >
                                    <Zap className="w-4 h-4" />
                                    Contact
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Sağ taraf: portre (masaüstü) */}
                        <motion.div variants={itemVariants} className="hidden md:flex flex-col items-center flex-shrink-0">
                            <Portrait imageError={imageError} onError={() => setImageError(true)} size="w-[280px] h-[340px] lg:w-[320px] lg:h-[384px]" />
                            <p className="matrix-only mt-5 font-mono text-xs text-dark-muted">
                                subject: <span className="text-matrix-400">oguz_berkay_bal</span> · status: <span className="text-matrix-400">verified</span>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Quick Preview Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-cyber font-bold mb-4">
                            <span className="text-neon-blue">SYSTEM</span>
                            <span className="text-neon-pink"> OVERVIEW</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-mono">
                            Quick access to matrix components
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'PROJECTS',
                                desc: 'Elite applications & experiments',
                                icon: Rocket,
                                link: '/projects',
                                color: 'neon-blue'
                            },
                            {
                                title: 'SKILLS',
                                desc: 'Technology arsenal & abilities',
                                icon: Terminal,
                                link: '/skills',
                                color: 'neon-green'
                            },
                            {
                                title: 'EXPERIENCE',
                                desc: 'Professional journey timeline',
                                icon: Zap,
                                link: '/experience',
                                color: 'neon-pink'
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link to={item.link} onClick={handleNavClick}>
                                    <motion.div
                                        className="cyber-card h-full p-8 text-center group cursor-pointer"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                    >
                                        <item.icon className={`w-16 h-16 text-${item.color} mx-auto mb-4 group-hover:animate-pulse`} />
                                        <h3 className="text-xl font-mono font-bold mb-2 text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4">
                                            {item.desc}
                                        </p>
                                        <div className={`inline-flex items-center text-${item.color} font-mono text-sm`}>
                                            ACCESS <ExternalLink className="w-4 h-4 ml-2" />
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 