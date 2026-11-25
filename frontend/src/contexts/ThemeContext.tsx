import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';

// Kırmızı hap: Matrix modu. Mavi hap: sade, açık renkli CV modu.
export type Pill = 'red' | 'blue';

interface ThemeContextType {
    pill: Pill;
    setPill: (pill: Pill) => void;
    togglePill: () => void;
}

const STORAGE_KEY = 'pill';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// index.html'deki erken betik seçimi <html data-pill> olarak zaten yazıyor;
// buradan okuyunca ilk render'da renk sıçraması olmuyor.
const initialPill = (): Pill =>
    typeof document !== 'undefined' && document.documentElement.dataset.pill === 'blue' ? 'blue' : 'red';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pill, setPillState] = useState<Pill>(initialPill);

    useEffect(() => {
        const html = document.documentElement;
        html.dataset.pill = pill;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', pill === 'blue' ? '#f7f9fc' : '#030703');
        try {
            localStorage.setItem(STORAGE_KEY, pill);
        } catch {
            // Gizli pencere vb.: tercih sadece bu oturumda kalır
        }
    }, [pill]);

    const setPill = useCallback((next: Pill) => setPillState(next), []);
    const togglePill = useCallback(() => setPillState((p) => (p === 'red' ? 'blue' : 'red')), []);

    return (
        <ThemeContext.Provider value={{ pill, setPill, togglePill }}>
            {children}
        </ThemeContext.Provider>
    );
};
