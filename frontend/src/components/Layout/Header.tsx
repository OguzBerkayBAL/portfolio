import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Palette, Mail, MessageSquare, Award, Menu, X } from 'lucide-react';

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
                    <div className="hidden md:flex items-center space-x-8">
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

                        {/* Auth kaldırıldı */}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
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