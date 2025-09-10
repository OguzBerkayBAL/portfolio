import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Rocket,
    Zap,
    Terminal,
    ChevronDown,
    ExternalLink,
    Download
} from 'lucide-react';

const Home: React.FC = () => {
    const [imageError, setImageError] = useState(false);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            // Hero section'ın %30'undan fazlası geçildiğinde indicator'ı gizle
            setShowScrollIndicator(scrollY < windowHeight * 0.3);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            <section className="min-h-screen flex items-center justify-center relative">
                {/* Scroll Indicator - Fixed at bottom of viewport when hero is visible */}
                <motion.div
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 hidden sm:block"
                    animate={{
                        y: [0, 10, 0],
                        opacity: showScrollIndicator ? 1 : 0
                    }}
                    transition={{
                        y: { duration: 2, repeat: Infinity },
                        opacity: { duration: 0.3 }
                    }}
                    style={{ pointerEvents: showScrollIndicator ? 'auto' : 'none' }}
                >
                    <ChevronDown className="w-8 h-8 text-neon-blue drop-shadow-lg" />
                </motion.div>

                {/* Animated Background */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Matrix Rain Effect */}
                    {Array.from({ length: 30 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-px bg-gradient-to-b from-neon-green to-transparent"
                            style={{
                                left: `${Math.random() * 100}%`,
                                height: `${Math.random() * 200 + 100}px`,
                            }}
                            animate={{
                                y: [-100, (typeof window !== 'undefined' ? window.innerHeight : 1080) + 100],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: 'linear',
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    className="container mx-auto px-4 relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main Hero Section - Responsive Layout */}
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-12 md:gap-16 max-w-7xl mx-auto min-h-[70vh] pt-8 text-center md:text-left">

                        {/* Left Side - Content */}
                        <motion.div
                            variants={itemVariants}
                            className="w-full md:w-3/5"
                        >
                            {/* Welcome Title */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl md:text-5xl lg:text-6xl font-cyber font-bold mb-8"
                            >
                                <span className="text-neon-blue">WELCOME TO THE</span>
                                <span className="text-neon-pink"> MATRIX</span>
                            </motion.h1>

                            {/* Mobile-only Profile Photo */}
                            <motion.div
                                variants={itemVariants}
                                className="flex md:hidden justify-center items-center my-8"
                            >
                                <div
                                    className="w-[240px] h-[240px] rounded-full border-4 border-neon-blue bg-gradient-to-br from-dark-card to-dark-bg flex items-center justify-center relative overflow-hidden group shadow-2xl shadow-neon-blue/40"
                                >
                                    {!imageError ? (
                                        <img
                                            src="/profile.jpg"
                                            alt="Oğuz Berkay Bal"
                                            className="w-full h-full object-cover rounded-full"
                                            onError={() => setImageError(true)}
                                        />
                                    ) : (
                                        <span className="text-neon-blue font-cyber text-5xl">👤</span>
                                    )}
                                </div>
                            </motion.div>

                            {/* Introduction Text */}
                            <div className="cyber-card p-6 text-left mb-8">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Terminal className="w-5 h-5 text-neon-green" />
                                    <span className="text-neon-green font-mono text-sm">NEURAL_INTERFACE.initialize()</span>
                                </div>

                                <p className="text-base text-gray-300 leading-relaxed mb-4">
                                    <span className="text-neon-blue font-mono">&gt;</span> Merhaba! Ben <span className="text-neon-green font-semibold">Oğuz Berkay BAL</span>, teknolojiyi tutkuyla benimseyen bir <span className="text-neon-pink">Bilgisayar Mühendisiyim</span>.
                                </p>

                                <p className="text-base text-gray-300 leading-relaxed mb-4">
                                    <span className="text-neon-blue font-mono">&gt;</span> Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği bölümünden mezunum.
                                </p>

                                <p className="text-base text-gray-300 leading-relaxed mb-4">
                                    <span className="text-neon-blue font-mono">&gt;</span> MERN Stack, Python, TypeScript ve yapay zeka teknolojileri üzerine projeler geliştiriyorum. Özellikle Retrieval-Augmented Generation (RAG) mimarisi ve büyük dil modelleriyle akıllı bilgi erişim sistemleri tasarlıyorum.
                                </p>

                                <p className="text-base text-gray-300 leading-relaxed">
                                    <span className="text-neon-blue font-mono">&gt;</span> Modern web teknolojileri, yapay zeka ve veri analizi alanlarında yenilikçi çözümler üreterek sürekli öğrenmeyi hedefliyorum. Bu dijital portfolyomda, geliştirdiğim projeleri keşfedebilir, yeteneklerimi inceleyebilir ve benimle iletişime geçebilirsiniz.
                                </p>

                                <div className="mt-6 flex items-center space-x-3 text-sm text-neon-green font-mono">
                                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                                    <span>STATUS: ONLINE & READY TO COLLABORATE</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <div className="flex flex-row gap-4 justify-center sm:justify-start items-stretch">
                                    <Link to="/projects" onClick={handleNavClick} className="flex">
                                        <motion.button
                                            className="cyber-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-full"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Rocket className="w-5 h-5 mr-2" />
                                            EXPLORE PROJECTS
                                        </motion.button>
                                    </Link>

                                    <motion.a
                                        href="/BerkayCV.pdf"
                                        download="BerkayCV.pdf"
                                        className="flex"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-black border-2 border-neon-green text-neon-green hover:text-neon-blue hover:border-neon-blue transition-all duration-300 font-mono uppercase tracking-wider flex items-center h-full">
                                            <Download className="w-5 h-5 mr-2" />
                                            DOWNLOAD CV
                                        </button>
                                    </motion.a>
                                </div>

                                <Link to="/contact" onClick={handleNavClick}>
                                    <motion.button
                                        className="px-8 py-4 border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black transition-all duration-300 font-mono uppercase tracking-wider"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Zap className="w-5 h-5 mr-2" />
                                        CONTACT
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Side - Profile Photo (Desktop-only) */}
                        <motion.div
                            variants={itemVariants}
                            className="hidden md:flex flex-shrink-0 justify-center items-start pt-10 md:pt-20"
                        >
                            <div
                                className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full border-4 border-neon-blue bg-gradient-to-br from-dark-card to-dark-bg flex items-center justify-center relative overflow-hidden group shadow-2xl shadow-neon-blue/40"
                            >
                                {!imageError ? (
                                    <>
                                        {/* Profile Photo */}
                                        <img
                                            src="/profile.jpg"
                                            alt="Oğuz Berkay Bal"
                                            className="w-full h-full object-cover rounded-full relative z-10 group-hover:scale-110 transition-transform duration-300"
                                            onError={() => setImageError(true)}
                                        />
                                        {/* Glow effect overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                                    </>
                                ) : (
                                    <>
                                        {/* Fallback placeholder */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-pink/20 opacity-50 group-hover:opacity-70 transition-opacity duration-300 rounded-full" />
                                        <span className="text-neon-blue font-cyber text-5xl relative z-10">👤</span>
                                    </>
                                )}
                                {/* Cyberpunk scanning ring */}
                                <div className="absolute inset-0 border-2 border-neon-green/60 opacity-0 group-hover:opacity-100 animate-ping rounded-full" />
                                {/* Secondary glow ring */}
                                <div className="absolute -inset-2 border border-neon-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                                {/* Pulse ring */}
                                <div className="absolute -inset-4 border border-neon-pink/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-700 rounded-full" />
                            </div>
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