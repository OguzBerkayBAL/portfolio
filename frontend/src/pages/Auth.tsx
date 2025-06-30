import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Shield,
    LogIn,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, isLoading } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Eğer zaten login olmuşsa ana sayfaya yönlendir
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            navigate('/');
        }
    }, [isAuthenticated, isLoading, navigate]);

    // Sayfa yüklendiğinde en üste scroll yap
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear errors when user types
        if (error) setError('');
        if (success) setSuccess('');
    };

    const validateForm = () => {
        if (!formData.usernameOrEmail || !formData.password) {
            setError('Email/Kullanıcı adı ve şifre gereklidir');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            await login({
                usernameOrEmail: formData.usernameOrEmail,
                password: formData.password
            });
            setSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
            setTimeout(() => navigate('/'), 1500);
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(err.response?.data?.message || err.message || 'Bir hata oluştu');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-6xl font-cyber font-bold mb-4">
                    <span className="text-neon-blue glitch" data-text="ADMIN">ADMIN</span>
                    <span className="text-neon-pink glitch" data-text=" ACCESS"> ACCESS</span>
                </h1>
                <p className="text-xl text-gray-300 font-mono max-w-2xl mx-auto">
                    Güvenli bağlantı kuruldu. Admin kimlik doğrulama protokolü aktif.
                </p>
            </motion.div>

            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="cyber-card p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-center mb-2"
                        >
                            <Shield className="w-6 h-6 text-neon-blue mr-2" />
                            <h2 className="text-xl font-bold text-white font-mono">
                                ADMİN GİRİŞİ
                            </h2>
                        </motion.div>
                        <p className="text-sm text-gray-400 font-mono">
                            Güvenlik anahtarlarınızı girin
                        </p>
                    </div>

                    {/* Error/Success Messages */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg flex items-center"
                            >
                                <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                                <span className="text-red-300 text-sm font-mono">{error}</span>
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded-lg flex items-center"
                            >
                                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                <span className="text-green-300 text-sm font-mono">{success}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email/Username */}
                        <div>
                            <label className="block text-gray-400 text-sm font-mono mb-2 uppercase tracking-wider">
                                Email / Kullanıcı Adı
                            </label>
                            <div className="relative">
                                <Mail className="input-icon" />
                                <input
                                    type="text"
                                    name="usernameOrEmail"
                                    value={formData.usernameOrEmail}
                                    onChange={handleInputChange}
                                    required
                                    className="cyber-input pl-10"
                                    placeholder="oguzberkaybal@icloud.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-400 text-sm font-mono mb-2 uppercase tracking-wider">
                                Şifre
                            </label>
                            <div className="relative">
                                <Lock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="cyber-input pl-10 pr-10"
                                    placeholder="Admin şifreniz"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-neon-blue transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className={`cyber-button w-full py-3 flex items-center justify-center mt-6 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="cyber-loading-spinner w-4 h-4 mr-2" />
                                    GİRİŞ YAPILIYOR...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4 mr-2" />
                                    SİSTEME GİR
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Security Info */}
                    <div className="mt-8 p-4 bg-black/50 rounded border border-gray-700">
                        <div className="flex items-center mb-2">
                            <Shield className="w-4 h-4 text-neon-green mr-2" />
                            <span className="text-neon-green text-sm font-mono font-bold">GÜVENLİK BİLGİSİ</span>
                        </div>
                        <div className="text-xs text-gray-400 font-mono space-y-1">
                            <div>• 256-bit SSL şifreleme aktif</div>
                            <div>• JWT token tabanlı kimlik doğrulama</div>
                            <div>• Admin yetkili erişim</div>
                            <div>• Session timeout: 24 saat</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Auth; 