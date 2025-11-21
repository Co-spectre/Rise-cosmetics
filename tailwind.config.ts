
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Modern minimal color palette with olive green and rice beige
				neutral: {
					50: '#fafafa',
					100: '#f5f5f5',
					150: '#f0f0f0',
					200: '#e5e5e5',
					300: '#d4d4d4',
					400: '#a3a3a3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#262626',
					900: '#171717',
				},
				stone: {
					50: '#fafaf9',
					100: '#f5f5f4',
					200: '#e7e5e4',
					300: '#d6d3d1',
					400: '#a8a29e',
					500: '#78716c',
					600: '#57534e',
					700: '#44403c',
					800: '#292524',
					900: '#1c1917',
				},
				// Enhanced color palette for luxury cosmetics
				rose: {
					25: '#fef7f7',
					50: '#fef2f2',
					100: '#fee2e2',
					200: '#fecaca',
					300: '#fca5a5',
					400: '#f87171',
					500: '#ef4444',
					600: '#dc2626',
					700: '#b91c1c',
					800: '#991b1b',
					900: '#7f1d1d',
				},
				pink: {
					25: '#fdf7f9',
					50: '#fdf2f8',
					100: '#fce7f3',
					200: '#fbcfe8',
					300: '#f9a8d4',
					400: '#f472b6',
					500: '#ec4899',
					600: '#db2777',
					700: '#be185d',
					800: '#9d174d',
					900: '#831843',
				},
				amber: {
					25: '#fffbeb',
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
				},
				// Soft dark olive green palette
				olive: {
					50: '#f8f9f7',
					100: '#f1f3ef',
					200: '#e1e6dc',
					300: '#c9d2c0',
					400: '#a8b59c',
					500: '#8a9a7e',
					600: '#6d7d63',
					700: '#586752',
					800: '#495444',
					900: '#3d453a',
				},
				// Rice beige palette
				rice: {
					50: '#fdfcf9',
					100: '#fbf8f2',
					200: '#f6f0e4',
					300: '#efe5d1',
					400: '#e6d6b8',
					500: '#dcc49d',
					600: '#ccab7f',
					700: '#b8926a',
					800: '#967659',
					900: '#7a614b',
				},
				// Warm product colors
				peach: {
					50: '#fef7ed',
					100: '#fef3e2',
				},
				cream: {
					50: '#fefdf8',
					100: '#fefcf0',
				},
				beige: {
					50: '#faf9f7',
					100: '#f5f4f1',
				},
				// NEW: Holistic Zen Palette
				holistic: {
					50: '#F9F7F2', // Rice Paper (Base)
					100: '#F0EBE3', // Light Beige
					200: '#E2DBC9', // Sand
					300: '#D4CBB0', // Dried Grass
					400: '#B7B7A4', // Sage Beige
					500: '#A5A58D', // Khaki Green
					600: '#6B705C', // Deep Olive (Primary)
					700: '#4A4E40', // Dark Olive
					800: '#3F4238', // Charcoal Olive (Text)
					900: '#2A2C24', // Deepest
				},
				// NEW: Cosmetic Skin Tones
				cosmetic: {
					100: '#FFF1E6', // Pale
					200: '#FDE2D0', // Fair
					300: '#E6CCB2', // Light
					400: '#DDBEA9', // Medium (Secondary)
					500: '#CB997E', // Tan (Accent)
					600: '#A57C65', // Deep Tan
					700: '#7F5539', // Rich
				},
				// NEW: Warm Pastel Palette
				'warm-cream': {
					DEFAULT: '#FAF8F3',
					light: '#FDFCFA',
					dark: '#F5F2ED',
				},
				'warm-ivory': {
					DEFAULT: '#F5F2ED',
					light: '#F8F6F2',
					dark: '#EDE8E0',
				},
				'pale-sand': {
					DEFAULT: '#EDE8E0',
					light: '#F2EEE8',
					dark: '#E5DFD5',
				},
				'warm-olive': {
					DEFAULT: '#8B956D',
					light: '#A3AD87',
					dark: '#727C57',
				},
				'soft-terracotta': {
					DEFAULT: '#D4A59A',
					light: '#E0B8AE',
					dark: '#C89286',
				},
				'muted-rose': {
					DEFAULT: '#E5D1C8',
					light: '#EDE0D9',
					dark: '#D9C0B5',
				},
				'warm-taupe': {
					DEFAULT: '#C9B8A8',
					light: '#D5C7BA',
					dark: '#B8A695',
				},
				'rich-brown': {
					DEFAULT: '#4A3F35',
					light: '#5D5145',
					dark: '#3A3128',
				},
				'soft-gray': {
					DEFAULT: '#8B8073',
					light: '#9D9386',
					dark: '#756A5E',
				}
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: '0px',
				md: '0px',
				sm: '0px'
			},
			keyframes: {
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'cart-slide': {
					'0%': {
						transform: 'translateX(100px) scale(0.8)',
						opacity: '0'
					},
					'50%': {
						transform: 'translateX(50px) scale(1.1)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'translateX(0) scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'slide-up': 'slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-in': 'fade-in 0.4s ease-out',
				'cart-slide': 'cart-slide 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
