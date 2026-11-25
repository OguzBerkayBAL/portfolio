import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Project } from '../types';

export const OPEN_PALETTE_EVENT = 'cmdk:open';

/** Header'daki buton gibi yerlerden paleti açmak için */
export const openCommandPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

interface Command {
    id: string;
    group: string;
    label: string;
    hint?: string;
    keywords?: string;
    run: () => void;
}

const CommandPalette: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const [projects, setProjects] = useState<Project[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const navigate = useNavigate();
    const { pill, setPill } = useTheme();

    const close = useCallback(() => {
        setOpen(false);
        setQuery('');
        setActive(0);
    }, []);

    // Ctrl+K / Cmd+K ve dışarıdan açma olayı
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        const onOpen = () => setOpen(true);
        window.addEventListener('keydown', onKey);
        window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
        };
    }, []);

    // Canlı projeleri ilk açılışta bir kez yükle
    useEffect(() => {
        if (!open || projects.length) return;
        fetch('/data/projects.json')
            .then((r) => (r.ok ? r.json() : []))
            .then((data: Project[]) => setProjects(data))
            .catch(() => undefined);
    }, [open, projects.length]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 30);
    }, [open]);

    const commands = useMemo<Command[]>(() => {
        const go = (path: string) => () => {
            navigate(path);
            window.scrollTo({ top: 0 });
        };
        const ext = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer');

        const list: Command[] = [
            { id: 'home', group: 'Gezin', label: 'cd ~', hint: 'Ana sayfa', keywords: 'home ana sayfa', run: go('/') },
            { id: 'projects', group: 'Gezin', label: 'cd projects', hint: 'Projeler', keywords: 'proje', run: go('/projects') },
            { id: 'skills', group: 'Gezin', label: 'cd skills', hint: 'Yetenekler', keywords: 'yetenek teknoloji', run: go('/skills') },
            { id: 'blog', group: 'Gezin', label: 'cd blog', hint: 'Blog', run: go('/blog') },
            { id: 'contact', group: 'Gezin', label: 'cd contact', hint: 'İletişim', keywords: 'iletişim mail', run: go('/contact') },
            {
                id: 'cv',
                group: 'Eylem',
                label: 'open cv.pdf',
                hint: 'CV indir',
                keywords: 'özgeçmiş resume indir',
                run: () => {
                    const a = document.createElement('a');
                    a.href = '/BerkayCV.pdf';
                    a.download = 'BerkayCV.pdf';
                    a.click();
                },
            },
            pill === 'red'
                ? { id: 'blue', group: 'Eylem', label: 'take blue_pill', hint: 'Sade açık tema', keywords: 'tema light açık mavi', run: () => setPill('blue') }
                : { id: 'red', group: 'Eylem', label: 'take red_pill', hint: 'Matrix teması', keywords: 'tema dark koyu kırmızı matrix', run: () => setPill('red') },
            { id: 'gh', group: 'Bağlantı', label: 'open github', hint: 'github.com/OguzBerkayBAL', run: ext('https://github.com/OguzBerkayBAL') },
            { id: 'li', group: 'Bağlantı', label: 'open linkedin', hint: 'linkedin.com/in/oguzberkaybal', run: ext('https://www.linkedin.com/in/oguzberkaybal') },
            { id: 'mail', group: 'Bağlantı', label: 'mail me', hint: 'oguzberkaybal@icloud.com', keywords: 'email eposta', run: () => { window.location.href = 'mailto:oguzberkaybal@icloud.com'; } },
        ];

        projects
            .filter((p) => p.liveUrl)
            .forEach((p) =>
                list.push({
                    id: `live-${p.id}`,
                    group: 'Canlı projeler',
                    label: `open ${p.id.replace(/^proj-/, '')}`,
                    hint: p.title,
                    keywords: p.technologies.join(' '),
                    run: ext(p.liveUrl as string),
                }),
            );
        return list;
    }, [navigate, pill, setPill, projects]);

    const filtered = useMemo(() => {
        const q = query.trim().toLocaleLowerCase('tr');
        if (!q) return commands;
        return commands.filter((c) =>
            `${c.label} ${c.hint ?? ''} ${c.keywords ?? ''}`.toLocaleLowerCase('tr').includes(q),
        );
    }, [commands, query]);

    useEffect(() => setActive(0), [query]);

    useEffect(() => {
        listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
    }, [active]);

    const runCommand = (cmd: Command | undefined) => {
        if (!cmd) return;
        close();
        cmd.run();
    };

    const onInputKey = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            runCommand(filtered[active]);
        } else if (e.key === 'Escape') {
            close();
        }
    };

    let lastGroup = '';

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-black/70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={close}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Komut paleti"
                        className="terminal-window w-full max-w-xl font-mono overflow-hidden"
                        initial={{ y: -12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0 }}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-border">
                            <Search className="w-4 h-4 text-matrix-600 shrink-0" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={onInputKey}
                                placeholder="Komut yaz ya da ara..."
                                role="combobox"
                                aria-expanded="true"
                                aria-controls="cmdk-list"
                                aria-activedescendant={filtered[active] ? `cmdk-${filtered[active].id}` : undefined}
                                className="flex-1 bg-transparent text-matrix-50 placeholder-matrix-700 outline-none text-sm"
                            />
                            <kbd className="text-[10px] text-dark-muted border border-dark-border rounded px-1.5 py-0.5">esc</kbd>
                        </div>

                        <ul id="cmdk-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
                            {filtered.length === 0 && (
                                <li className="px-4 py-6 text-center text-sm text-dark-muted">command not found: {query}</li>
                            )}
                            {filtered.map((cmd, i) => {
                                const header = cmd.group !== lastGroup ? cmd.group : null;
                                lastGroup = cmd.group;
                                return (
                                    <React.Fragment key={cmd.id}>
                                        {header && (
                                            <li role="presentation" className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-dark-muted">
                                                {header}
                                            </li>
                                        )}
                                        <li
                                            id={`cmdk-${cmd.id}`}
                                            data-index={i}
                                            role="option"
                                            aria-selected={i === active}
                                            onMouseMove={() => setActive(i)}
                                            onClick={() => runCommand(cmd)}
                                            className="cmdk-item mx-2 px-3 py-2 rounded-sm flex items-center justify-between gap-4 cursor-pointer text-sm text-ink"
                                        >
                                            <span>
                                                <span className="text-matrix-600">$ </span>
                                                {cmd.label}
                                            </span>
                                            {cmd.hint && <span className="text-xs text-dark-muted truncate">{cmd.hint}</span>}
                                        </li>
                                    </React.Fragment>
                                );
                            })}
                        </ul>

                        <div className="flex items-center gap-4 px-4 py-2 border-t border-dark-border text-[10px] text-dark-muted">
                            <span>↑↓ seç</span>
                            <span>↵ çalıştır</span>
                            <span className="ml-auto">ctrl + k</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
