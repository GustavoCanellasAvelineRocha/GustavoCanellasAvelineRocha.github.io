type P = { className?: string }
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const SunIcon = ({ className = 'icon' }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const MoonIcon = ({ className = 'icon' }: P) => (
  <svg {...base} className={className}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
)

export const MenuIcon = ({ className = 'icon' }: P) => (
  <svg {...base} className={className}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)

export const CloseIcon = ({ className = 'icon' }: P) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const ChevronRight = ({ className = 'icon' }: P) => (
  <svg {...base} className={className}>
    <path d="M9 5l7 7-7 7" />
  </svg>
)

export const ChevronLeft = ({ className = 'icon' }: P) => (
  <svg {...base} className={className}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

export const ArrowIcon = ({ className = 'icon' }: P) => (
  <svg {...base} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const MotionIcon = ({ className = 'icon' }: P) => (
  <svg {...base} className={className}>
    <path d="M3 12c2.5-5 5.5-5 8 0s5.5 5 8 0" />
    <path d="M3 17c2.5-3 5.5-3 8 0s5.5 3 8 0" opacity="0.5" />
  </svg>
)

export const StillIcon = ({ className = 'icon' }: P) => (
  <svg {...base} className={className}>
    <path d="M4 12h16M4 17h16" />
  </svg>
)
