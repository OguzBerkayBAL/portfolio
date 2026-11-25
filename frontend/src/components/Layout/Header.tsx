import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Palette, Mail, MessageSquare, Award, Menu, X, Command } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { openCommandPalette } from '../CommandPalette';

// Kırmızı hap: Matrix, mavi hap: sade açık tema
const PillSwitch: React.FC = () => {
    const { pill, setPill } = useTheme();
    const base = 'w-7 h-3.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-matrix-400';
    return (
        <div className="flex items-center gap-2 px-2.5 py-1.5 border border-dark-border rounded-full" role="group" aria-label="Tema seç">
            <button
                type="button"
                onClick={() => setPill('red')}
                aria-pressed={pill === 'red'}
                title="Kırmızı hap: Matrix modu"
                className={`${base} bg-[#ff2a3d] ${pill === 'red' ? 'shadow-[0_0_12px_rgba(255,42,61,0.7)] scale-110' : 'opacity-40 hover:opacity-80'}`}
            />
            <button
                type="button"
                onClick={() => setPill('blue')}
                aria-pressed={pill === 'blue'}
                title="Mavi hap: sade CV modu"
                className={`${base} bg-[#2563eb] ${pill === 'blue' ? 'shadow-[0_0_12px_rgba(37,99,235,0.6)] scale-110' : 'opacity-40 hover:opacity-80'}`}
            />
        </div>
    );
};

const PaletteButton: React.FC = () => (
    <button
        type="button"
        onClick={openCommandPalette}
        className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 border border-dark-border rounded-sm text-xs font-mono text-dark-muted hover:text-matrix-400 hover:border-matrix-600 transition-colors"
        aria-label="Komut paletini aç"
    >
        <Command className="w-3.5 h-3.5" />K
    </button>
);

const mobileMenuVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const mobileLinkVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const Header: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'HOME', href: '/', icon: Code },
        { name: 'PROJECTS', href: '/projects', icon: Palette },
        { name: 'SKILLS', href: '/skills', icon: Award },
        { name: 'BLOG', href: '/blog', icon: MessageSquare },
        { name: 'CONTACT', href: '/contact', icon: Mail }
    ];

    const isActivePath = (path: string) => {
        return location.pathname === path;
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleNavClick = (href: string) => {
        scrollToTop();
    };

    const handleCloseMenu = (href: string) => {
        handleNavClick(href);
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-50 backdrop-blur-sm"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 to-dark-card/90" />

            <div className="container mx-auto px-4 py-4 relative">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" onClick={scrollToTop}>
                        <motion.div
                            className="flex items-center space-x-2 group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Terminal className="w-8 h-8 text-neon-blue group-hover:animate-pulse" />
                            <div className="font-cyber text-xl font-bold">
                                <span className="text-neon-blue">/baloguzberkay</span>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <nav className="flex items-center space-x-1">
                            {navigation.map((item) => (
                                <Link key={item.href} to={item.href} onClick={() => handleNavClick(item.href)}>
                                    <motion.div
                                        className={`px-4 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 ${isActivePath(item.href)
                                            ? 'text-neon-blue'
                                            : 'text-gray-300 hover:text-neon-blue'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                    </motion.div>
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-3">
                            <PaletteButton />
                            <PillSwitch />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <PillSwitch />
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-neon-blue">
                            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark-bg/95 absolute top-full left-0 right-0"
                    >
                        <motion.ul
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="flex flex-col items-center space-y-4 py-4"
                        >
                            {navigation.map((item) => (
                                <motion.li key={item.href} variants={mobileLinkVariants} className="w-full text-center">
                                    <Link to={item.href} onClick={() => handleCloseMenu(item.href)} className="block w-full">
                                        <div
                                            className={`px-4 py-2 font-mono text-lg uppercase tracking-wider transition-all duration-300 ${isActivePath(item.href)
                                                ? 'text-neon-blue'
                                                : 'text-gray-300 hover:text-neon-blue'
                                                }`}
                                        >
                                            {item.name}
                                        </div>
                                    </Link>
                                </motion.li>
                            ))}
                            {/* Auth kaldırıldı */}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header; 