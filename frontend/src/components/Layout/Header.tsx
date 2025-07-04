import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, User, Palette, Mail, MessageSquare, Award, LogOut, Settings, Download, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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
    const { isAuthenticated, user, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
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

    const handleLogout = async () => {
        try {
            await logout();
            setShowUserMenu(false);
            // Ana sayfaya yönlendir
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
        }
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

                    {/* Desktop Navigation + Auth Section */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Desktop Navigation */}
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

                        {/* Auth Section */}
                        <div className="flex items-center space-x-4">
                            {isAuthenticated && user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 hover:border-neon-blue transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-pink rounded-full flex items-center justify-center">
                                            <span className="text-xs font-bold text-black">
                                                {user.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                        <span className="text-gray-300 font-mono text-sm">
                                            {user.firstName ? `${user.firstName} ${user.lastName}` : user.username}
                                        </span>
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50"
                                        >
                                            <div className="p-4 border-b border-gray-700">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-pink rounded-full flex items-center justify-center">
                                                        <span className="text-sm font-bold text-black">
                                                            {user.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-mono text-sm">
                                                            {user.firstName ? `${user.firstName} ${user.lastName}` : user.username}
                                                        </p>
                                                        <p className="text-gray-400 text-xs">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-2">
                                                <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 hover:text-neon-blue transition-colors flex items-center">
                                                    <Settings className="w-4 h-4 mr-3" />
                                                    Profil Ayarları
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-colors flex items-center"
                                                >
                                                    <LogOut className="w-4 h-4 mr-3" />
                                                    Çıkış Yap
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/auth" onClick={scrollToTop}>
                                    <motion.button
                                        className="px-6 py-2 border-2 font-mono text-sm uppercase tracking-wider transition-all duration-300"
                                        style={{
                                            borderColor: '#ff00ff',
                                            color: '#ff00ff',
                                            backgroundColor: 'transparent',
                                            textShadow: '0 0 10px #ff00ff'
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            style: {
                                                borderColor: '#ff00ff',
                                                backgroundColor: '#ff00ff',
                                                color: '#000000',
                                                textShadow: 'none',
                                                boxShadow: '0 0 20px #ff00ff'
                                            }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#ff00ff';
                                            e.currentTarget.style.backgroundColor = '#ff00ff';
                                            e.currentTarget.style.color = '#000000';
                                            e.currentTarget.style.textShadow = 'none';
                                            e.currentTarget.style.boxShadow = '0 0 20px #ff00ff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#ff00ff';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#ff00ff';
                                            e.currentTarget.style.textShadow = '0 0 10px #ff00ff';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <Terminal className="w-4 h-4 mr-2 inline" />
                                        ACCESS MATRIX
                                    </motion.button>
                                </Link>
                            )}
                        </div>
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
                            {/* Mobile Auth Section */}
                            <motion.li variants={mobileLinkVariants} className="pt-4 border-t border-gray-700 w-full flex justify-center">
                                {isAuthenticated && user ? (
                                    <div className="text-center">
                                        <div className="flex justify-center mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-pink rounded-full flex items-center justify-center">
                                                <span className="text-lg font-bold text-black">
                                                    {user.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-white font-mono text-base mb-2">
                                            {user.firstName ? `${user.firstName} ${user.lastName}` : user.username}
                                        </p>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-colors flex items-center justify-center"
                                        >
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Çıkış Yap
                                        </button>
                                    </div>
                                ) : (
                                    <Link to="/auth" onClick={() => handleCloseMenu('/auth')} className="block w-full text-center">
                                        <button
                                            className="px-6 py-2 border-2 font-mono text-sm uppercase tracking-wider transition-all duration-300"
                                            style={{
                                                borderColor: '#ff00ff',
                                                color: '#ff00ff',
                                                backgroundColor: 'transparent',
                                                textShadow: '0 0 10px #ff00ff'
                                            }}
                                        >
                                            <Terminal className="w-4 h-4 mr-2 inline" />
                                            ACCESS MATRIX
                                        </button>
                                    </Link>
                                )}
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header; 