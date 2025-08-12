import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, Zap } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: 'https://github.com/OguzBerkayBAL', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/oguzberkaybal', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:oguzberkaybal@icloud.com', label: 'Email' },
    ];

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

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-dark-card border-t border-dark-border mt-20"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-50" />
                {/* Scanning line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
            </div>

            <div className="container mx-auto px-4 py-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <motion.div
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Zap className="w-6 h-6 text-neon-blue animate-pulse" />
                            <h3 className="font-cyber text-lg font-bold">
                                <span className="text-neon-blue">CYBER</span>
                                <span className="text-neon-pink">FOLIO</span>
                            </h3>
                        </motion.div>
                        <p className="text-gray-400 text-sm font-mono leading-relaxed">
                            Cyberpunk temalı gelişmiş portföy sistemi.
                            Dark web teknolojileri ile güçlendirilmiştir.
                        </p>
                        <div className="flex items-center space-x-2 text-xs font-mono">
                            <span className="text-gray-500">STATUS:</span>
                            <span className="text-neon-green animate-pulse">ONLINE</span>
                            <div className="w-2 h-2 bg-neon-green rounded-full animate-ping" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-mono font-bold text-neon-blue uppercase tracking-wider">
                            QUICK ACCESS
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: 'Projects', href: '/projects' },
                                { label: 'Skills', href: '/skills' },
                                { label: 'Experience', href: '/experience' },
                                { label: 'Blog', href: '/blog' },
                                { label: 'Contact', href: '/contact' },
                                { label: 'Auth', href: '/auth' },
                            ].map((link) => (
                                <Link key={link.label} to={link.href} onClick={handleNavClick}>
                                    <motion.div
                                        className="text-gray-400 hover:text-neon-blue transition-colors text-sm font-mono"
                                        whileHover={{ x: 5 }}
                                    >
                                        {`> ${link.label}`}
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="space-y-4">
                        <h4 className="font-mono font-bold text-neon-pink uppercase tracking-wider">
                            NETWORK
                        </h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded bg-dark-border/50 hover:bg-neon-blue/20 transition-colors group"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-neon-blue transition-colors" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Terminal-style info */}
                        <div className="bg-black/50 p-3 rounded border border-dark-border font-mono text-xs">
                            <div className="text-neon-green mb-1">$ system_info</div>
                            <div className="text-gray-400">
                                <div>Frontend: React + TypeScript</div>
                                <div>Theme: Cyberpunk Dark Mode</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-dark-border mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-sm font-mono text-gray-400">
                            <span>© {currentYear} CyberFolio.</span>
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-neon-pink animate-pulse" />
                            <span>& lots of</span>
                            <Zap className="w-4 h-4 text-neon-blue animate-bounce" />
                        </div>

                        <div className="flex items-center space-x-4 text-xs font-mono text-gray-500">
                            <span>BUILD: v1.0.0</span>
                            <span>•</span>
                            <span>SECURITY: HIGH</span>
                            <span>•</span>
                            <span className="text-neon-green">MATRIX ACTIVE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-px h-8 bg-gradient-to-t from-neon-blue/50 to-transparent"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                            y: 100,
                            opacity: 0
                        }}
                        animate={{
                            y: -50,
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>
        </motion.footer>
    );
};

export default Footer; 