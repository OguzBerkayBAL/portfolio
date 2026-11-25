import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import FloatingWorm from './components/FloatingWorm';
import MatrixRain from './components/MatrixRain';
import CommandPalette from './components/CommandPalette';

const AppShell: React.FC = () => {
    const { pill } = useTheme();
    const matrix = pill === 'red';

    return (
        <div className="min-h-screen bg-dark-bg text-body relative overflow-hidden">
            {/* Matrix efektleri sadece kırmızı hapta */}
            {matrix && <MatrixRain />}

            {/* Ekran kenarlarını karartan vinyet ve CRT tarama çizgileri (mavi hapta CSS ile gizli) */}
            <div className="crt-vignette" />
            <div className="crt-overlay" />

            {matrix && (
                <div className="fixed inset-0 pointer-events-none z-30">
                    <FloatingWorm />
                </div>
            )}

            {/* Main App Content */}
            <div className="relative z-20">
                <Layout>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/skills" element={<Skills />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </Layout>
            </div>

            <CommandPalette />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <AppShell />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
