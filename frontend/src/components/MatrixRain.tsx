import React, { useEffect, useRef } from 'react';

// Katakana + rakam + birkaç Latin harf: klasik "digital rain" karakter seti
const GLYPHS =
    'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ZXMBOＢＡＬ:・."=*+-<>¦';

const FONT_SIZE = 16;
const FRAME_MS = 50; // ~20 fps yeterli, CPU'yu yormaz
const SLOW_RADIUS = 160; // fareye bu kadar yakın sütunlar yavaşlar

interface Drop {
    y: number; // satır cinsinden
    speed: number; // kare başına satır
}

const MatrixRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const mouse = { x: -9999, y: -9999 };
        let drops: Drop[] = [];
        let width = 0;
        let height = 0;
        let raf = 0;
        let last = 0;

        const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
            ctx.fillStyle = '#030703';
            ctx.fillRect(0, 0, width, height);

            const columns = Math.ceil(width / FONT_SIZE);
            const rows = height / FONT_SIZE;
            drops = Array.from({ length: columns }, (_, i) => drops[i] ?? {
                y: Math.random() * -rows,
                speed: 0.35 + Math.random() * 0.65,
            });
        };

        const step = () => {
            // Önceki kareyi yavaşça karart: kuyruk efekti
            ctx.fillStyle = 'rgba(3, 7, 3, 0.09)';
            ctx.fillRect(0, 0, width, height);

            const rows = height / FONT_SIZE;
            for (let i = 0; i < drops.length; i++) {
                const d = drops[i];
                const x = i * FONT_SIZE;
                const y = d.y * FONT_SIZE;

                // Önceki baş karakteri normal yeşile çevir
                ctx.fillStyle = '#00b82f';
                ctx.fillText(randomGlyph(), x, y - FONT_SIZE);
                // Parlak baş karakter
                ctx.fillStyle = '#c8ffd4';
                ctx.fillText(randomGlyph(), x, y);

                const near = Math.abs(mouse.x - x) < SLOW_RADIUS && Math.abs(mouse.y - y) < SLOW_RADIUS;
                d.y += near ? d.speed * 0.2 : d.speed;

                if (d.y > rows && Math.random() > 0.975) {
                    d.y = 0;
                    d.speed = 0.35 + Math.random() * 0.65;
                }
            }
        };

        const loop = (t: number) => {
            raf = requestAnimationFrame(loop);
            if (t - last < FRAME_MS) return;
            last = t;
            step();
        };

        const onMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const onLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };
        const onVisibility = () => {
            if (reduceMotion) return;
            cancelAnimationFrame(raf);
            if (!document.hidden) raf = requestAnimationFrame(loop);
        };

        resize();
        window.addEventListener('resize', resize);

        if (reduceMotion) {
            // Hareket istemeyenler için tek, durağan bir kare
            for (let i = 0; i < 60; i++) step();
        } else {
            window.addEventListener('mousemove', onMove);
            document.addEventListener('mouseleave', onLeave);
            document.addEventListener('visibilitychange', onVisibility);
            raf = requestAnimationFrame(loop);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.22]"
        />
    );
};

export default MatrixRain;
