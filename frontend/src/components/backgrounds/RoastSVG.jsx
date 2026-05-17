import React from "react";

export function GlitchBG() {
    return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="glitch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
                </linearGradient>
                <filter id="glitch-noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                </filter>
            </defs>

            {/* Background */}
            <rect width="400" height="300" fill="url(#glitch-grad)" />

            {/* Glitch lines */}
            <g opacity="0.4" filter="url(#glitch-noise)">
                <line x1="0" y1="50" x2="400" y2="50" stroke="#06b6d4" strokeWidth="2" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="#ec4899" strokeWidth="1.5" />
                <line x1="0" y1="250" x2="400" y2="250" stroke="#06b6d4" strokeWidth="1" />
            </g>

            {/* Scattered squares for chaos */}
            <rect x="20" y="30" width="15" height="15" fill="#6366f1" opacity="0.5" />
            <rect x="350" y="120" width="20" height="20" fill="#ec4899" opacity="0.4" />
            <rect x="80" y="250" width="12" height="12" fill="#06b6d4" opacity="0.3" />
        </svg>
    );
}

export function WarningBG() {
    return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="warning-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
                </linearGradient>
            </defs>

            <rect width="400" height="300" fill="url(#warning-grad)" />

            {/* Warning symbols */}
            <g opacity="0.3">
                <text x="50" y="80" fontSize="60" fill="none" stroke="#f59e0b" strokeWidth="1">
                    ⚠
                </text>
                <text x="280" y="200" fontSize="50" fill="none" stroke="#ef4444" strokeWidth="1">
                    ⚠
                </text>
            </g>

            {/* Radiating circles */}
            <circle cx="200" cy="150" r="40" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
            <circle cx="200" cy="150" r="60" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0.2" />
        </svg>
    );
}

export function ChaosBG() {
    return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="chaos-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
                </linearGradient>
            </defs>

            <rect width="400" height="300" fill="url(#chaos-grad)" />

            {/* Broken heart */}
            <g opacity="0.3" transform="translate(200, 80)">
                <path
                    d="M -10,0 Q -15,-5 -15,-10 Q -15,-15 -10,-15 Q -5,-10 0,-5 Q 5,-10 10,-15 Q 15,-15 15,-10 Q 15,-5 10,0 L 0,15 Z"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="1"
                />
            </g>

            {/* Chat bubbles */}
            <g opacity="0.25">
                <circle cx="80" cy="220" r="20" fill="none" stroke="#06b6d4" strokeWidth="1" />
                <polygon points="95,230 100,245 85,235" fill="none" stroke="#06b6d4" strokeWidth="1" />

                <circle cx="320" cy="80" r="25" fill="none" stroke="#a855f7" strokeWidth="1" />
                <polygon points="335,95 350,105 340,90" fill="none" stroke="#a855f7" strokeWidth="1" />
            </g>
        </svg>
    );
}

export function CyborgBG() {
    return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="cyborg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
                </linearGradient>
            </defs>

            <rect width="400" height="300" fill="url(#cyborg-grad)" />

            {/* CPU-like grid */}
            <g opacity="0.2" stroke="#3b82f6" strokeWidth="1" fill="none">
                <rect x="80" y="80" width="100" height="100" />
                <rect x="200" y="80" width="100" height="100" />
                <line x1="130" y1="80" x2="130" y2="180" />
                <line x1="250" y1="80" x2="250" y2="180" />
                <line x1="80" y1="130" x2="180" y2="130" />
                <line x1="200" y1="130" x2="300" y2="130" />

                {/* Connection nodes */}
                <circle cx="80" cy="80" r="3" fill="#3b82f6" />
                <circle cx="180" cy="80" r="3" fill="#3b82f6" />
                <circle cx="300" cy="80" r="3" fill="#3b82f6" />
                <circle cx="80" cy="180" r="3" fill="#8b5cf6" />
                <circle cx="300" cy="180" r="3" fill="#ec4899" />
            </g>
        </svg>
    );
}

export function LoadingBG() {
    return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="loading-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
                </linearGradient>
            </defs>

            <rect width="400" height="300" fill="url(#loading-grad)" />

            {/* Loading bar */}
            <g opacity="0.4">
                <rect x="50" y="120" width="300" height="15" rx="7" fill="none" stroke="#06b6d4" strokeWidth="1" />
                <rect x="50" y="120" width="150" height="15" rx="7" fill="#06b6d4" opacity="0.3" />
            </g>

            {/* Spinner */}
            <g opacity="0.3" transform="translate(200, 80)">
                <circle cx="0" cy="0" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="31.4 94.2" />
            </g>
        </svg>
    );
}

export function RadarBG() {
    return (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="radar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
                </linearGradient>
            </defs>

            <rect width="400" height="300" fill="url(#radar-grad)" />

            {/* Concentric circles */}
            <g opacity="0.3" fill="none" stroke="#10b981" strokeWidth="1">
                <circle cx="200" cy="150" r="30" />
                <circle cx="200" cy="150" r="60" />
                <circle cx="200" cy="150" r="90" />
            </g>

            {/* Radar lines */}
            <g opacity="0.25" stroke="#06b6d4" strokeWidth="0.5">
                <line x1="200" y1="150" x2="200" y2="60" />
                <line x1="200" y1="150" x2="270" y2="100" />
                <line x1="200" y1="150" x2="270" y2="200" />
                <line x1="200" y1="150" x2="200" y2="240" />
            </g>

            {/* Blips */}
            <circle cx="200" cy="100" r="2" fill="#10b981" opacity="0.6" />
            <circle cx="250" cy="180" r="2" fill="#06b6d4" opacity="0.5" />
        </svg>
    );
}
