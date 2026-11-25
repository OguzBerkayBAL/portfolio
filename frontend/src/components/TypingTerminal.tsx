import React, { useEffect, useState } from 'react';

export interface TerminalStep {
    command: string;
    output: React.ReactNode;
}

interface TypingTerminalProps {
    title: string;
    steps: TerminalStep[];
    /** Komut yazımında harf başına süre (ms) */
    typeSpeed?: number;
    startDelay?: number;
}

/**
 * Komutları tek tek "yazan" ve çıktılarını gösteren terminal.
 * Tüm içerik baştan DOM'da ve yer kaplıyor; görünmeyen kısımlar sadece
 * `invisible` olduğu için yazarken sayfa zıplamıyor.
 */
const TypingTerminal: React.FC<TypingTerminalProps> = ({ title, steps, typeSpeed = 38, startDelay = 900 }) => {
    // step: şu an yazılan komut; chars: o komutun kaç harfi göründü
    const [step, setStep] = useState(0);
    const [chars, setChars] = useState(0);
    const [started, setStarted] = useState(false);
    const reduceMotion =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (reduceMotion) {
            setStep(steps.length);
            return;
        }
        const t = setTimeout(() => setStarted(true), startDelay);
        return () => clearTimeout(t);
    }, [reduceMotion, startDelay, steps.length]);

    useEffect(() => {
        if (!started || step >= steps.length) return;
        const command = steps[step].command;
        if (chars < command.length) {
            const t = setTimeout(() => setChars((c) => c + 1), typeSpeed);
            return () => clearTimeout(t);
        }
        // Komut bitti: kısa bir "enter" beklemesi, sonra çıktı ve sıradaki komut
        const t = setTimeout(() => {
            setStep((s) => s + 1);
            setChars(0);
        }, 420);
        return () => clearTimeout(t);
    }, [started, step, chars, steps, typeSpeed]);

    const done = step >= steps.length;

    return (
        <div className="terminal-window text-left">
            <div className="terminal-window__bar font-mono">
                <span>{title}</span>
                <span className="flex items-center gap-2 text-matrix-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" />
                    online
                </span>
            </div>
            <div className="p-5 sm:p-6 font-mono text-[0.92rem] leading-relaxed text-ink space-y-2">
                {steps.map((s, i) => {
                    const typed = i < step ? s.command.length : i === step ? chars : 0;
                    const cmdVisible = i <= step && (started || i < step);
                    const showCursor = !done && i === step && started;
                    return (
                        <div key={s.command}>
                            <p className={cmdVisible ? '' : 'invisible'}>
                                <span className="text-matrix-400">$ </span>
                                <span className="text-matrix-50">{s.command.slice(0, typed)}</span>
                                <span className={showCursor ? 'cursor-block' : ''} />
                                <span className="invisible">{s.command.slice(typed)}</span>
                            </p>
                            <div className={`mt-1 mb-3 ${i < step ? 'animate-[fadeIn_.3s_ease-out]' : 'invisible'}`}>
                                {s.output}
                            </div>
                        </div>
                    );
                })}
                <p className={done ? 'text-matrix-400 cursor-block' : 'invisible'}>$ </p>
            </div>
        </div>
    );
};

export default TypingTerminal;
