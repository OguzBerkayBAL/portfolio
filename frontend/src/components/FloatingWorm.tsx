import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion';

// Hafif, performans dostu tek bir "solucan" animasyonu.
// Framer Motion ile 4-7 saniyede bir rastgele pozisyona süzülür.
// pointer-events kapalıdır; DOM tek elemandır ve yalnızca transform animasyonu çalışır.

const WORM_SIZE = 120; // px

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

const FloatingWorm: React.FC = () => {
    const [viewport, setViewport] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1920, h: typeof window !== 'undefined' ? window.innerHeight : 1080 });
    const [target, setTarget] = useState({ x: 100, y: 100 });
    const [moveDuration, setMoveDuration] = useState(6);
    const mouseRef = useRef<{ x: number; y: number }>({ x: viewport.w / 2, y: viewport.h / 2 });
    const rafPending = useRef<number | null>(null);
    const centerRef = useRef<{ x: number; y: number }>({ x: 100, y: 100 });
    const [blink, setBlink] = useState(false);
    const repelTsRef = useRef(0);

    useEffect(() => {
        const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const pickNext = useCallback((from: { x: number; y: number }) => {
        const range = 220; // adım genişliği
        const nx = clamp(from.x + (Math.random() * 2 - 1) * range, 16, viewport.w - WORM_SIZE - 16);
        const ny = clamp(from.y + (Math.random() * 2 - 1) * range, 16, viewport.h - WORM_SIZE - 16);
        return { x: nx, y: ny };
    }, [viewport.w, viewport.h]);

    const pickAwayFromMouse = useCallback(() => {
        const cx = centerRef.current.x;
        const cy = centerRef.current.y;
        const dx = cx + WORM_SIZE / 2 - mouseRef.current.x;
        const dy = cy + WORM_SIZE / 2 - mouseRef.current.y;
        const len = Math.max(1, Math.hypot(dx, dy));
        const ux = dx / len;
        const uy = dy / len;
        const step = 300;
        const nx = clamp(cx + ux * step, 16, viewport.w - WORM_SIZE - 16);
        const ny = clamp(cy + uy * step, 16, viewport.h - WORM_SIZE - 16);
        return { x: nx, y: ny };
    }, [viewport.w, viewport.h]);

    useEffect(() => {
        // başlangıç hedefi
        setTarget(pickNext({ x: viewport.w / 2 - WORM_SIZE / 2, y: viewport.h / 2 - WORM_SIZE / 2 }));
    }, [pickNext, viewport.w, viewport.h]);

    const gradientId = useMemo(() => `wormGradient_${Math.random().toString(36).slice(2)}`, []);
    const irisGradId = useMemo(() => `irisGrad_${Math.random().toString(36).slice(2)}`, []);

    // Mouse/touch izleme (raf ile throttle)
    useEffect(() => {
        const onMove = (x: number, y: number) => {
            if (rafPending.current != null) return;
            rafPending.current = requestAnimationFrame(() => {
                mouseRef.current.x = x;
                mouseRef.current.y = y;
                rafPending.current = null;
                // Repel: mouse çok yaklaşırsa hızlıca uzaklaş
                const cx = centerRef.current.x + WORM_SIZE / 2;
                const cy = centerRef.current.y + WORM_SIZE / 2;
                const dist = Math.hypot(cx - x, cy - y);
                if (dist < 120) {
                    // agresif kısa kaçış
                    setMoveDuration(0.45);
                    setTarget(pickAwayFromMouse());
                }
            });
        };
        const onMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
        const onTouch = (e: TouchEvent) => {
            if (e.touches && e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        window.addEventListener('mousemove', onMouse);
        window.addEventListener('touchmove', onTouch, { passive: true });
        return () => {
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('touchmove', onTouch);
            if (rafPending.current) cancelAnimationFrame(rafPending.current);
        };
    }, []);

    // Rastgele aralıklarla göz kırpma
    useEffect(() => {
        let alive = true;
        const schedule = () => {
            const delay = 3000 + Math.random() * 5000;
            setTimeout(() => {
                if (!alive) return;
                setBlink(true);
                setTimeout(() => {
                    if (!alive) return;
                    setBlink(false);
                    schedule();
                }, 260);
            }, delay);
        };
        schedule();
        return () => {
            alive = false;
        };
    }, []);

    return (
        <motion.div
            style={{
                position: 'fixed',
                width: WORM_SIZE,
                height: WORM_SIZE,
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 30,
                willChange: 'transform',
            }}
            initial={{ x: target.x, y: target.y, rotate: 0 }}
            animate={{ x: target.x, y: target.y }}
            transition={{ duration: moveDuration, ease: 'easeOut' }}
            onUpdate={(latest) => {
                if (typeof latest.x === 'number') centerRef.current.x = latest.x;
                if (typeof latest.y === 'number') centerRef.current.y = latest.y;
            }}
            onAnimationComplete={() => { setMoveDuration(6); setTarget((prev) => pickNext(prev)); }}
        >
            {/* Hafif wiggle için ayrı bir sürekli dönüş animasyonu */}
            <motion.div
                style={{ width: '100%', height: '100%' }}
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg width={WORM_SIZE} height={WORM_SIZE} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 10px rgba(0,255,255,0.65))', mixBlendMode: 'screen' }}>
                    <defs>
                        {/* Dış hat için neon-blue → neon-pink geçişi */}
                        <linearGradient id={gradientId} x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#00ffff" />
                            <stop offset="100%" stopColor="#ff00ff" />
                        </linearGradient>
                        {/* İris için neon-blue merkezden neon-purple kenara yumuşak fade */}
                        <radialGradient id={irisGradId} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#00ffff" />
                            <stop offset="60%" stopColor="#8a2be2" />
                            <stop offset="100%" stopColor="rgba(138,43,226,0)" />
                        </radialGradient>
                    </defs>
                    {/* Göz kırpma: tüm dış şekil + iris + pupil */}
                    <motion.g animate={{ scaleY: blink ? 0.08 : 1 }} transition={{ duration: 0.22, ease: 'easeInOut' }} style={{ transformOrigin: '60px 60px' }}>
                        {/* Dış göz şekli (badem) */}
                        <path d="M10 60 C 35 18, 85 18, 110 60 C 85 102, 35 102, 10 60 Z" fill="rgba(255,255,255,0.04)" stroke={`url(#${gradientId})`} strokeWidth="3" />
                        {/* İç iris halkası */}
                        <circle cx="60" cy="60" r="22" fill={`url(#${irisGradId})`} opacity="0.25" />
                        <circle cx="60" cy="60" r="20" stroke={`url(#${gradientId})`} strokeWidth="2" fill="none" opacity="0.6" />
                        {/* Göz bebeği (mouse yönüne bakan) */}
                        <Pupil centerRef={centerRef} mouseRef={mouseRef} />
                        {/* Üst kapak highlight */}
                        <path d="M15 60 C 38 28, 82 28, 105 60" stroke="#8a2be2" strokeOpacity="0.28" strokeWidth="2" fill="none" />
                    </motion.g>
                </svg>
            </motion.div>
        </motion.div>
    );
};

export default FloatingWorm;


// Ayrı küçük bileşen: Pupil (anlık takip için motion values + animation frame)
const Pupil: React.FC<{ centerRef: React.MutableRefObject<{ x: number; y: number }>; mouseRef: React.MutableRefObject<{ x: number; y: number }> }> = ({ centerRef, mouseRef }) => {
    const cx0 = 60, cy0 = 60; // SVG içi merkez
    const irisRadius = 20; // iri çemberin yarıçapı (stroke 2 ile hizalı)
    const pupilMaxOffset = 12.5; // bebeğin taşmayacağı maksimum ofset

    const cx = useMotionValue(cx0);
    const cy = useMotionValue(cy0);
    // Yay parametreleri ile yumuşak ama hızlı takip
    const sx = useSpring(cx, { stiffness: 900, damping: 40, mass: 0.4 });
    const sy = useSpring(cy, { stiffness: 900, damping: 40, mass: 0.4 });

    useAnimationFrame(() => {
        const ex = centerRef.current.x + cx0;
        const ey = centerRef.current.y + cy0;
        const dx = mouseRef.current.x - ex;
        const dy = mouseRef.current.y - ey;
        const len = Math.max(1, Math.hypot(dx, dy));
        const ux = dx / len;
        const uy = dy / len;
        // Bebeğin dış daireyi aşmaması için ofseti sınırlıyoruz
        const ox = ux * pupilMaxOffset;
        const oy = uy * pupilMaxOffset;
        cx.set(cx0 + ox);
        cy.set(cy0 + oy);
    });

    return (
        <>
            {/* Pupil core */}
            <motion.circle r={7} fill="#00ffff" cx={sx} cy={sy} />
            {/* Pupil highlight */}
            <motion.circle r={3} fill="#ffffff" fillOpacity={0.7} cx={useSpring(sx, { stiffness: 900, damping: 40 })} cy={useSpring(sy, { stiffness: 900, damping: 40 })} />
        </>
    );
};

// Göz kaçma davranışı (yakınlaşınca hızlı uzaklaş)
// Ana komponent seviyesinde frame başına tetikleyelim
FloatingWorm.displayName = 'FloatingWorm';

// Attach a secondary hook to the component to run repel logic
// We rely on module-level side effects not being needed; all inside component already


