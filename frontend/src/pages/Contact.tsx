import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Send,
    Terminal,
    User,
    MessageSquare,
    Zap,
    FileText,
    CheckCircle,
    AlertCircle,
    Download
} from 'lucide-react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    // Email.js konfigürasyonu
    useEffect(() => {
        // Environment variable'dan public key al veya default değer kullan
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
        emailjs.init(publicKey);
    }, []);

    // Sayfa yüklendiğinde en üste scroll yap
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'oguzberkaybal@icloud.com',
            href: 'mailto:oguzberkaybal@icloud.com',
            color: 'neon-blue'
        },
        {
            icon: Phone,
            label: 'Telefon',
            value: '0542 260 27 32',
            href: 'tel:+905422602732',
            color: 'neon-green'
        },
        {
            icon: MapPin,
            label: 'Konum',
            value: 'Nevşehir/Merkez/Türkiye',
            href: '#',
            color: 'neon-pink'
        }
    ];

    const socialLinks = [
        {
            icon: Github,
            label: 'GitHub',
            href: 'https://github.com/OguzBerkayBAL',
            color: 'neon-purple'
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/oguzberkaybal',
            color: 'neon-blue'
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Backend kaldırıldığı için emailjs üzerinden direkt mail gönderiyoruz
            const templateParams = {
                user_name: formData.name,      // Template'deki {{user_name}} ile eşleştir
                user_email: formData.email,    // Template'deki {{user_email}} ile eşleştir
                subject: formData.subject,     // SUBJECT'I TEMPLATE'E GÖNDER
                message: formData.message,
                to_email: 'oguzberkaybal@icloud.com', // Kendi email'iniz
            };

            await emailjs.send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID!,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
                templateParams
            );

            setSubmitStatus('success');
            setStatusMessage('✅ Mesajınız başarıyla gönderildi! En kısa sürede yanıtlayacağım.');
            setFormData({ name: '', email: '', subject: '', message: '' });

        } catch (error) {
            console.error('Email gönderme hatası:', error);
            setSubmitStatus('error');
            setStatusMessage('❌ Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);

            // Status mesajını 5 saniye sonra temizle
            setTimeout(() => {
                setSubmitStatus('idle');
                setStatusMessage('');
            }, 5000);
        }
    };

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-6xl font-cyber font-bold mb-4">
                    <span className="text-neon-pink glitch" data-text="CONTACT">CONTACT</span>
                    <span className="text-neon-blue glitch" data-text=" MATRIX"> MATRIX</span>
                </h1>
                <p className="text-xl text-gray-300 font-mono max-w-2xl mx-auto">
                    İletişim kanalları aktif. Mesaj gönderme protokolü hazır.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-8"
                >
                    <div className="cyber-card p-6">
                        <h2 className="text-2xl font-bold text-neon-green mb-6 flex items-center">
                            <Terminal className="w-6 h-6 mr-2" />
                            İLETİŞİM BİLGİLERİ
                        </h2>

                        <div className="space-y-6">
                            {contactInfo.map((contact, index) => (
                                <motion.div
                                    key={contact.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex items-center space-x-4 group"
                                >
                                    <div className={`p-3 rounded-lg bg-gray-800 text-${contact.color} group-hover:animate-pulse`}>
                                        <contact.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm font-mono uppercase tracking-wider">
                                            {contact.label}
                                        </p>
                                        <a
                                            href={contact.href}
                                            className={`text-white hover:text-${contact.color} transition-colors font-mono`}
                                        >
                                            {contact.value}
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="cyber-card p-6">
                        <h3 className="text-xl font-bold text-neon-blue mb-4 flex items-center">
                            <Zap className="w-5 h-5 mr-2" />
                            SOSYAL AĞLAR
                        </h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-4 rounded-lg bg-gray-800 hover:bg-${social.color} hover:bg-opacity-20 border border-gray-700 hover:border-${social.color} transition-all duration-300 group`}
                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <social.icon className={`w-6 h-6 text-gray-400 group-hover:text-${social.color} transition-colors`} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Terminal Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="cyber-card p-6 bg-black bg-opacity-50"
                    >
                        <div className="font-mono text-sm">
                            <div className="text-neon-green mb-2">$ whoami</div>
                            <div className="text-gray-300 mb-4">
                                Oğuz Berkay BAL - Computer Engineering Student<br />
                                SDU University - Expected Graduation: July 2025<br />
                                Location: Nevşehir, Türkiye
                            </div>
                            <div className="text-neon-pink mb-2">$ skills --list</div>
                            <div className="text-gray-300 mb-4">
                                MERN Stack | Python | AI/ML | RAG Architecture<br />
                                NestJS | PostgreSQL | TypeScript | Docker
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-neon-green">
                                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse mr-2"></div>
                                    STATUS: Available for collaboration
                                </div>
                                <motion.a
                                    href="/OguzBerkayBalCV(Türkçe).pdf"
                                    download="OguzBerkayBalCV.pdf"
                                    className="inline-flex items-center px-4 py-2 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 text-xs font-mono uppercase tracking-wider rounded"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Download className="w-3 h-3 mr-1" />
                                    CV
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="cyber-card p-6">
                        <h2 className="text-2xl font-bold text-neon-pink mb-6 flex items-center">
                            <MessageSquare className="w-6 h-6 mr-2" />
                            MESAJ GÖNDER
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm font-mono mb-2 uppercase tracking-wider">
                                        İsim
                                    </label>
                                    <div className="relative">
                                        <User className="input-icon" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="cyber-input pl-10"
                                            placeholder="Adınız"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm font-mono mb-2 uppercase tracking-wider">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="input-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="cyber-input pl-10"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-mono mb-2 uppercase tracking-wider">
                                    Konu
                                </label>
                                <div className="relative">
                                    <FileText className="input-icon" />
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="cyber-input pl-10"
                                        placeholder="Mesaj konusu"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-mono mb-2 uppercase tracking-wider">
                                    Mesaj
                                </label>
                                <div className="relative">
                                    <MessageSquare className="textarea-icon" />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="cyber-input resize-none pl-10"
                                        placeholder="Mesajınızı buraya yazın..."
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={`cyber-button w-full py-3 flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="cyber-loading-spinner w-4 h-4 mr-2" />
                                        GÖNDERILIYOR...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        MESAJ GÖNDER
                                    </>
                                )}
                            </motion.button>

                            {/* Status Messages */}
                            {submitStatus !== 'idle' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`p-4 rounded-lg border flex items-center space-x-3 ${submitStatus === 'success'
                                        ? 'bg-green-900/30 border-neon-green text-neon-green'
                                        : 'bg-red-900/30 border-red-500 text-red-400'
                                        }`}
                                >
                                    {submitStatus === 'success' ? (
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    )}
                                    <p className="font-mono text-sm">
                                        {statusMessage}
                                    </p>
                                </motion.div>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact; 