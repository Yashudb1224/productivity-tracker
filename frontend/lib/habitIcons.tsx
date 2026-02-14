import React from 'react';

export const habitIcons = {
    gym: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-gym" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
            </defs>
            <path d="M6.5 6L4.5 9.5M17.5 6L19.5 9.5M4 10H20M5 10L6.5 18H17.5L19 10" stroke="url(#grad-gym)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 13V15M14 13V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
    ),
    yoga: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-yoga" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
            </defs>
            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="url(#grad-yoga)" strokeWidth="2" />
            <path d="M12 8V12L15 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            <circle cx="12" cy="12" r="3" fill="url(#grad-yoga)" fillOpacity="0.2" />
        </svg>
    ),
    running: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-run" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
            </defs>
            <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="url(#grad-run)" />
            <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
        </svg>
    ),
    reading: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-read" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FACC15" />
                    <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
            </defs>
            <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="url(#grad-read)" strokeWidth="2" strokeLinecap="round" />
            <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="url(#grad-read)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M8 7H16M8 11H16M8 15H12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </svg>
    ),
    coding: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-code" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
            </defs>
            <path d="M16 18L22 12L16 6" stroke="url(#grad-code)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6L2 12L8 18" stroke="url(#grad-code)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 4L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </svg>
    ),
    water: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-water" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
            </defs>
            <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="url(#grad-water)" />
            <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
    ),
    meditation: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-med" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2DD4BF" />
                    <stop offset="100%" stopColor="#0D9488" />
                </linearGradient>
            </defs>
            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="url(#grad-med)" strokeWidth="2" opacity="0.3" />
            <path d="M12 6C12 6 15 9 15 13C15 17 12 18 12 18C12 18 9 17 9 13C9 9 12 6 12 6Z" fill="url(#grad-med)" opacity="0.8" />
            <circle cx="12" cy="13" r="1.5" fill="white" opacity="0.5" />
        </svg>
    ),
    music: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-music" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="100%" stopColor="#BE185D" />
                </linearGradient>
            </defs>
            <path d="M9 18V5L21 3V16" stroke="url(#grad-music)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" fill="url(#grad-music)" />
            <circle cx="18" cy="16" r="3" fill="url(#grad-music)" />
        </svg>
    ),
    writing: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-write" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>
            <path d="M12 19H21" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25Z" fill="url(#grad-write)" stroke="url(#grad-write)" strokeWidth="1" />
            <path d="M18.41 2.41C18.05 2.05 17.5 1.87 17 1.87C16.5 1.87 15.95 2.05 15.59 2.41L14.13 3.87L17.88 7.62L19.34 6.16C20.12 5.38 20.12 4.12 19.34 3.34L18.41 2.41Z" fill="url(#grad-write)" />
        </svg>
    ),
    swimming: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-swim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
            </defs>
            <path d="M2 12C2 12 5 9 8 12C11 15 13 15 16 12C19 9 22 12 22 12" stroke="url(#grad-swim)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17C2 17 5 14 8 17C11 20 13 20 16 17C19 14 22 17 22 17" stroke="url(#grad-swim)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <path d="M12 8C12 8 11 5 12 3C13 1 15 2 15 2" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </svg>
    ),
    cycling: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-cycle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FACC15" />
                    <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
            </defs>
            <circle cx="5.5" cy="17.5" r="3.5" stroke="url(#grad-cycle)" strokeWidth="2" />
            <circle cx="18.5" cy="17.5" r="3.5" stroke="url(#grad-cycle)" strokeWidth="2" />
            <path d="M15 6C14.4477 6 14 6.44772 14 7C14 7.55228 14.4477 8 15 8H17" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <path d="M12 17.5L9 9H17L18.5 17.5" stroke="url(#grad-cycle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    sleep: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-sleep" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#4338CA" />
                </linearGradient>
            </defs>
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" fill="url(#grad-sleep)" />
            <path d="M12 7V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </svg>
    ),
    junk: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-junk" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="9" stroke="url(#grad-junk)" strokeWidth="2" opacity="0.5" />
            <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    streak: (className = "w-5 h-5") => (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-fire-main" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="40%" stopColor="#F43F5E" />
                    <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
                <linearGradient id="grad-fire-core" x1="50%" y1="20%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#FEF9C3" />
                    <stop offset="50%" stopColor="#FACC15" />
                    <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
                <filter id="fire-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            {/* Outer Glow Layer */}
            <path
                d="M12 2C10 5 6 7 6 12C6 16.5 8.5 21 12 22C15.5 21 18 16.5 18 12C18 7 14 5 12 2Z"
                fill="#EF4444"
                fillOpacity="0.2"
                filter="url(#fire-glow)"
            />
            {/* Main Flame */}
            <path
                d="M12 3C10.5 5.5 7 8 7 12.5C7 16 9 19 12 20C15 19 17 16 17 12.5C17 8 13.5 5.5 12 3Z"
                fill="url(#grad-fire-main)"
            />
            {/* Hot Core */}
            <path
                d="M12 8C11 10 9 12 9 14.5C9 17 10.5 19 12 19.5C13.5 19 15 17 15 14.5C15 12 13 10 12 8Z"
                fill="url(#grad-fire-core)"
            />
            {/* Dynamic Sparks */}
            <circle cx="12" cy="5" r="0.5" fill="white" fillOpacity="0.6">
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="9" cy="9" r="0.4" fill="white" fillOpacity="0.4">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
            </circle>
        </svg>
    ),
    default: (className = "w-6 h-6") => (
        <svg className={`${className} icon-glow`} viewBox="0 0 24 24" fill="none">
            <defs>
                <linearGradient id="grad-default" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                </linearGradient>
            </defs>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#grad-default)" strokeWidth="2" opacity="0.3" />
            <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="url(#grad-default)" strokeWidth="2" strokeDasharray="2 4" />
            <circle cx="12" cy="12" r="3" fill="url(#grad-default)" />
        </svg>
    )
};

export function getHabitIcon(iconId: string | undefined, className?: string, habitName?: string) {
    const finalClass = `${className || "w-6 h-6"} icon-glow transition-all duration-700`;

    if (iconId && habitIcons[iconId as keyof typeof habitIcons]) {
        return habitIcons[iconId as keyof typeof habitIcons](finalClass);
    }

    // Auto-map based on name if no iconId
    if (habitName) {
        const name = habitName.toLowerCase();
        if (name.includes('yoga')) return habitIcons.yoga(finalClass);
        if (name.includes('gym') || name.includes('work') || name.includes('exercise')) return habitIcons.gym(finalClass);
        if (name.includes('run')) return habitIcons.running(finalClass);
        if (name.includes('read')) return habitIcons.reading(finalClass);
        if (name.includes('meditat')) return habitIcons.meditation(finalClass);
        if (name.includes('code') || name.includes('program')) return habitIcons.coding(finalClass);
        if (name.includes('water') || name.includes('drink') || name.includes('hydrat')) return habitIcons.water(finalClass);
        if (name.includes('sleep')) return habitIcons.sleep(finalClass);
        if (name.includes('junk') || name.includes('sugar') || name.includes('smoke')) return habitIcons.junk(finalClass);
        if (name.includes('write') || name.includes('journal')) return habitIcons.writing(finalClass);
        if (name.includes('music') || name.includes('play') || name.includes('instrument')) return habitIcons.music(finalClass);
    }

    return habitIcons.default(finalClass);
}
