import React from 'react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-4xl font-cyber font-bold mb-8">
                    <span className="text-neon-pink">EXPERIENCE</span>
                    <span className="text-neon-blue"> LOG</span>
                </h1>
                <div className="cyber-card p-8">
                    <p className="text-xl text-gray-300 font-mono">
                        Timeline data loading...
                    </p>
                    <div className="text-neon-green mt-4">
                        [ ACCESSING CAREER DATABASE ]
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Experience; 