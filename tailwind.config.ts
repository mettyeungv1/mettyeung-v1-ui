import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(21, 61, 111, 0.1) 0%, rgba(111, 191, 115, 0.1) 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-mi-sans-khmer)', 'var(--font-google-sans)', 'system-ui', 'sans-serif'],
        latin: ['var(--font-google-sans)', 'system-ui', 'sans-serif'],
        khmer: ['var(--font-mi-sans-khmer)', 'var(--font-google-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['clamp(2.75rem,5vw,4.5rem)', { lineHeight: '1.22', letterSpacing: '0' }],
        'display-md': ['clamp(2.25rem,4vw,3.75rem)', { lineHeight: '1.24', letterSpacing: '0' }],
        'display-sm': ['clamp(2rem,3vw,3rem)', { lineHeight: '1.28', letterSpacing: '0' }],
        h1: ['clamp(2rem,3.2vw,3.5rem)', { lineHeight: '1.3', letterSpacing: '0' }],
        h2: ['clamp(1.75rem,2.4vw,2.5rem)', { lineHeight: '1.35', letterSpacing: '0' }],
        h3: ['clamp(1.5rem,1.8vw,2rem)', { lineHeight: '1.4', letterSpacing: '0' }],
        h4: ['1.25rem', { lineHeight: '1.45', letterSpacing: '0' }],
        h5: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0' }],
        h6: ['1rem', { lineHeight: '1.55', letterSpacing: '0' }],
        'body-lg': ['1.125rem', { lineHeight: '1.8', letterSpacing: '0' }],
        body: ['1rem', { lineHeight: '1.75', letterSpacing: '0' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.7', letterSpacing: '0' }],
        caption: ['0.8125rem', { lineHeight: '1.55', letterSpacing: '0' }],
        label: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],
        button: ['0.9375rem', { lineHeight: '1.45', letterSpacing: '0' }],
        table: ['0.9375rem', { lineHeight: '1.65', letterSpacing: '0' }],
        nav: ['0.9375rem', { lineHeight: '1.5', letterSpacing: '0' }],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: {
          page: '#FAFAFA',
          panel: '#FFFFFF',
          muted: '#F5F5F5',
          elevated: '#FFFFFF',
          inverse: '#004D8C',
        },
        interactive: {
          primary: '#004D8C',
          primaryHover: '#003D73',
          primaryMuted: '#E6F2FF',
          accent: '#6FBF73',
          accentHover: '#4CAF50',
          accentMuted: '#F0F9F1',
          neutral: '#F5F5F5',
          neutralHover: '#EEEEEE',
        },
        
        // Khmer Gold
        'khmer-gold': {
          DEFAULT: '#D4AF37',
          50: '#FAF7E8',
          100: '#F5EFD1',
          200: '#EBDFA3',
          300: '#E1CF75',
          400: '#D7BF47',
          500: '#D4AF37',
          600: '#B8962C',
          700: '#9C7D21',
          800: '#806416',
          900: '#644B0B',
          950: '#4A3808',
        },
        
        // Khmer Red
        'khmer-red': {
          DEFAULT: '#C41E3A',
          50: '#F8E6EA',
          100: '#F1CDD5',
          200: '#E39BAB',
          300: '#D56981',
          400: '#C73757',
          500: '#C41E3A',
          600: '#A61830',
          700: '#881226',
          800: '#6A0C1C',
          900: '#4C0612',
          950: '#36040D',
        },
        
        // Khmer Blue
        'khmer-blue': {
          DEFAULT: '#1E40AF',
          50: '#EBF2FF',
          100: '#D6E4FF',
          200: '#B5CCFF',
          300: '#83A9FF',
          400: '#4A7CFF',
          500: '#1E4FFF',
          600: '#0A2FE8',
          700: '#0B24B5',
          800: '#102292',
          900: '#153D6F',
          950: '#0F2C50',
        },
        
        // Primary Color - Deep Blue (#153D6F)
        primary: {
          DEFAULT: '#004D8C',
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CCFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#007FFF',
          600: '#0066CC',
          700: '#004D99',
          800: '#003366',
          900: '#004D8C', // Main primary
          950: '#003D73', // Hover state
        },
        
        // Secondary Color - Clean White (#FFFFFF)
        secondary: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#FDFDFD',
          300: '#FCFCFC',
          400: '#FAFAFA',
          500: '#F8F8F8',
          600: '#F5F5F5', // Secondary card background
          700: '#F0F0F0',
          800: '#E8E8E8',
          900: '#E0E0E0',
        },
        
        // Accent Color - Soft Green/Muted Teal (#6FBF73)
        accent: {
          DEFAULT: '#6FBF73',
          50: '#F0F9F1',
          100: '#DCF2DD',
          200: '#BBE5BD',
          300: '#8DD491',
          400: '#6FBF73', // Main accent
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        
        // Neutral Tones - Light Gray
        neutral: {
          DEFAULT: '#F5F5F5',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        
        // Text Colors - Optimized for readability
        text: {
          primary: '#1F1F1F',    // Main content text
          secondary: '#616161',   // Supporting body text
          tertiary: '#9E9E9E',    // Low-emphasis text and icons
          inverse: '#FFFFFF',     // Text on dark surfaces
          muted: '#757575',      // Subtle text
          disabled: '#BDBDBD',   // Disabled text
        },
        
        // Status Colors - Semantic colors
        success: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
          dark: '#388E3C',
        },
        warning: {
          DEFAULT: '#FF9800',
          light: '#FFB74D',
          dark: '#F57C00',
        },
        error: {
          DEFAULT: '#F44336',
          light: '#E57373',
          dark: '#D32F2F',
        },
        info: {
          DEFAULT: '#2196F3',
          light: '#64B5F6',
          dark: '#1976D2',
        },
        
        // Component-specific colors
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1F1F1F',
          secondary: '#F5F5F5',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1F1F1F',
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#757575',
        },
        destructive: {
          DEFAULT: '#F44336',
          foreground: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E0E0E0',
          subtle: '#EEEEEE',
          strong: '#BDBDBD',
          focus: '#004D8C',
          inverse: 'rgba(255,255,255,0.18)',
        },
        input: '#F5F5F5',
        ring: '#153D6F',
        
        // Chart colors
        chart: {
          '1': '#004D8C',
          '2': '#6FBF73',
          '3': '#FF9800',
          '4': '#2196F3',
          '5': '#9C27B0',
        },
      },
      spacing: {
        'section-sm': '3rem',
        'section-md': '4rem',
        'section-lg': '5rem',
        'card-sm': '1rem',
        'card-md': '1.5rem',
        'card-lg': '2rem',
      },
      boxShadow: {
        surface: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)',
        popover: '0 12px 24px rgba(16, 24, 40, 0.10), 0 2px 6px rgba(16, 24, 40, 0.06)',
        modal: '0 24px 64px rgba(16, 24, 40, 0.18)',
        focus: '0 0 0 3px rgba(0, 77, 140, 0.14)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-fast': 'marquee 10s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
