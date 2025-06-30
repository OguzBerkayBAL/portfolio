import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-dark-bg text-white">
            {/* Cyber Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
              `,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>

                {/* Animated particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-neon-blue rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                        }}
                        animate={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        style={{
                            opacity: Math.random() * 0.5 + 0.1,
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <Header />

            {/* Main Content */}
            <motion.main
                className="flex-1 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout; 