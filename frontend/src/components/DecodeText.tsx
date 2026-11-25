import React, { useEffect, useState } from 'react';

const SCRAMBLE = 'ｱｶｻﾀﾅﾊﾏﾔﾗﾜ01ZXﾐﾑﾒ<>/*+=';

interface DecodeTextProps {
    text: string;
    className?: string;
    /** Harf başına çözülme süresi (ms) */
    speed?: number;
    delay?: number;
}

/**
 * Metni rastgele karakterlerden soldan sağa "çözerek" gösterir.
 * Ekran okuyucular için gerçek metin aria-label ile verilir.
 */
const DecodeText: React.FC<DecodeTextProps> = ({ text, className, speed = 45, delay = 0 }) => {
    const [output, setOutput] = useState(text);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setOutput(text);
            return;
        }

        let frame = 0;
        let interval: ReturnType<typeof setInterval> | undefined;
        const totalFrames = text.length + 6;

        const scramble = (resolved: number) =>
            text
                .split('')
                .map((ch, i) => {
                    if (i < resolved || ch === ' ') return ch;
                    return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
                })
                .join('');

        setOutput(scramble(0));
        const start = setTimeout(() => {
            interval = setInterval(() => {
                frame++;
                const resolved = Math.max(0, frame - 6);
                setOutput(scramble(resolved));
                if (frame >= totalFrames) {
                    clearInterval(interval);
                    setOutput(text);
                }
            }, speed);
        }, delay);

        return () => {
            clearTimeout(start);
            if (interval) clearInterval(interval);
        };
    }, [text, speed, delay]);

    return (
        <span className={className} aria-label={text}>
            <span aria-hidden="true">{output}</span>
        </span>
    );
};

export default DecodeText;
