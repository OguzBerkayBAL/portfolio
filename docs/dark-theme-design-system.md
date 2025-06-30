# 🎨 Dark Theme Tech - Design System

## 🎭 Design Philosophy

**"Terminal meets Matrix meets Modern Web"**

Bu portföy sitesi, geliştiricilere tanıdık gelen terminal/IDE ortamlarının görsel dilini modern web tasarımı ile harmanlıyor. Cyberpunk estetiği ve minimalist yaklaşım bir araya geliyor.

## 🎨 Color Palette

### Primary Colors
```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0a;      /* Deep Black - Ana arkaplan */
  --bg-secondary: #1a1a1a;    /* Dark Charcoal - İkincil arkaplan */
  --bg-surface: #2a2a2a;      /* Medium Gray - Kartlar, paneller */
  
  /* Accent Colors */
  --accent-cyan: #00ffff;      /* Neon Cyan - Ana vurgu rengi */
  --accent-purple: #8b5cf6;    /* Tech Purple - İkincil vurgu */
  --success: #00ff41;          /* Terminal Green - Başarı mesajları */
  
  /* Status Colors */
  --warning: #fbbf24;          /* Amber - Uyarılar */
  --error: #ef4444;            /* Red - Hatalar */
  --info: #3b82f6;             /* Blue - Bilgi */
  
  /* Text Colors */
  --text-primary: #ffffff;     /* White - Ana metin */
  --text-secondary: #a1a1aa;   /* Light Gray - İkincil metin */
  --text-muted: #71717a;       /* Muted Gray - Gri metin */
  
  /* Interactive */
  --border: #374151;           /* Gray - Kenarlıklar */
  --border-focus: #00ffff;     /* Cyan - Focus durumu */
  --hover: rgba(0, 255, 255, 0.1); /* Hover efekti */
}
```

## 🔤 Typography

### Font Families
```css
/* Code/Terminal Typography */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

/* Display Typography */
--font-display: 'Inter', 'SF Pro Display', system-ui, sans-serif;

/* Body Typography */
--font-body: 'Inter', 'SF Pro Text', system-ui, sans-serif;
```

### Typography Scale
```css
/* Headings */
--text-6xl: 3.75rem;    /* 60px - Hero başlıklar */
--text-5xl: 3rem;       /* 48px - Ana başlıklar */
--text-4xl: 2.25rem;    /* 36px - Section başlıklar */
--text-3xl: 1.875rem;   /* 30px - Alt başlıklar */
--text-2xl: 1.5rem;     /* 24px - Kart başlıkları */
--text-xl: 1.25rem;     /* 20px - Büyük metin */

/* Body Text */
--text-lg: 1.125rem;    /* 18px - Büyük paragraf */
--text-base: 1rem;      /* 16px - Normal metin */
--text-sm: 0.875rem;    /* 14px - Küçük metin */
--text-xs: 0.75rem;     /* 12px - Caption */
```

## 🎬 Animations & Effects

### Terminal Effects
```css
/* Typing Animation */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* Cursor Blink */
@keyframes blink {
  0%, 50% { opacity: 1 }
  51%, 100% { opacity: 0 }
}

/* Glitch Effect */
@keyframes glitch {
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px) }
  40% { transform: translate(-2px, -2px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(2px, -2px) }
  100% { transform: translate(0) }
}
```

### Neon Glow Effects
```css
/* Neon Button Glow */
.neon-glow {
  box-shadow: 
    0 0 5px var(--accent-cyan),
    0 0 10px var(--accent-cyan),
    0 0 20px var(--accent-cyan);
}

/* Text Glow */
.text-glow {
  text-shadow: 
    0 0 5px currentColor,
    0 0 10px currentColor;
}
```

## 🧩 Component Design

### Terminal Window
```
┌─ Terminal ─────────────────────────────── ● ● ● ┐
│ berkay@portfolio:~$ whoami                      │
│ > Senior Full Stack Developer                   │
│ berkay@portfolio:~$ ls -la skills/              │
│ > React TypeScript NestJS PostgreSQL            │
│ berkay@portfolio:~$ cat about.md                │
│ > Passionate developer creating elegant         │
│   solutions with modern technologies            │
│ berkay@portfolio:~$ █                           │
└─────────────────────────────────────────────────┘
```

### Neon Card Design
```
╭─────────────────────────────────╮
│  ⚡ PROJECT TITLE               │
│  ─────────────────────────────  │
│  Modern web application built   │
│  with React and NestJS         │
│                                 │
│  [React] [TypeScript] [NestJS]  │
│                                 │
│  ┌─ LINKS ─┐                    │
│  │ GitHub  │ │ Live Demo │      │
│  └─────────┘ └───────────┘      │
╰─────────────────────────────────╯
```

### Skill Visualization
```
Frontend Development     ████████████████ 95%
Backend Development      ███████████████░ 90%
Database Design          ██████████████░░ 85%
DevOps & Deployment      ████████████░░░░ 75%
```

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Very large screens */
```

## 🎯 Page Layouts

### Hero Section
- Matrix rain background animation
- Terminal-style introduction
- Glowing call-to-action buttons
- ASCII art elements

### About Section
- Terminal window with personal info
- Timeline with glitch effects
- Skills visualization with progress bars

### Projects Section
- Card grid with neon borders
- Filter buttons with terminal styling
- Project details in modal overlays

### Contact Section
- Terminal-style contact form
- ASCII art decoration
- Social links with hover glow

## 🚀 Interactive Elements

### Buttons
- Primary: Neon cyan glow
- Secondary: Purple gradient
- Hover: Glitch animation
- Active: Pulse effect

### Forms
- Terminal-style inputs
- Green success states
- Red error states
- Cyan focus indicators

### Navigation
- Fixed header with transparency
- Terminal prompt style
- Smooth scroll indicators
- Mobile hamburger menu

## 💡 Special Features

### Matrix Rain
- Background canvas animation
- Falling green characters
- Performance optimized
- Density control

### Typing Animation
- Character-by-character reveal
- Configurable speed
- Cursor blink effect
- Multiple text rotation

### Glitch Effects
- Text distortion on hover
- Image corruption effect
- Random trigger events
- Intensity levels

### Terminal Commands
- Interactive command history
- Auto-complete suggestions
- Easter eggs
- Help system

Bu tasarım sistemi, modern web development'ın teknik estetiğini kullanıcı dostu bir deneyimle birleştirerek etkileyici bir portföy sitesi oluşturacak. 