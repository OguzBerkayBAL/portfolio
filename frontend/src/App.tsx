import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layout Components
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';

// Page Components  
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
// Auth sayfası kaldırıldı

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Matrix Rain Background Component
const MatrixRain: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
            <div className="matrix-bg w-full h-full" />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <div className="min-h-screen bg-dark-bg text-white relative overflow-hidden">
                        {/* Matrix Background */}
                        <MatrixRain />

                        {/* Cyber Grid Background */}
                        <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
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

                        {/* Scanning Line Animation */}
                        <motion.div
                            className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent z-10"
                            animate={{
                                y: ['0vh', '100vh'],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />

                        {/* Main App Content */}
                        <div className="relative z-10">
                            <Layout>
                                <ScrollToTop />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/projects" element={<Projects />} />
                                    <Route path="/skills" element={<Skills />} />
                                    <Route path="/experience" element={<Experience />} />
                                    <Route path="/blog" element={<Blog />} />
                                    <Route path="/contact" element={<Contact />} />
                                    {/* /auth kaldırıldı */}
                                </Routes>
                            </Layout>
                        </div>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App; 