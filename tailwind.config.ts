import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
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
    				'50': '#f0f4ff',
    				'100': '#e0e9ff',
    				'200': '#c7d7fe',
    				'300': '#a5bbfc',
    				'400': '#8199f8',
    				'500': '#6376f1',
    				'600': '#4c5ce5',
    				'700': '#3d4ac9',
    				'800': '#2f3ba3',
    				'900': '#1a1f3a',
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				'50': '#f4f8fb',
    				'100': '#e8f1f8',
    				'200': '#d1e4f0',
    				'300': '#b3cde0',
    				'400': '#7a8ab3',
    				'500': '#5a6ea0',
    				'600': '#4a5d85',
    				'700': '#3a4b73',
    				'800': '#2a3650',
    				'900': '#1f2942',
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			cta: {
    				'50': '#ecfdf5',
    				'100': '#d1fae5',
    				'200': '#a7f3d0',
    				'300': '#6ee7b7',
    				'400': '#34d399',
    				'500': '#10b981',
    				'600': '#059669',
    				'700': '#047857',
    				'800': '#065f46',
    				'900': '#064e3b',
    				DEFAULT: '#10b981',
    				foreground: '#ffffff'
    			},
    			highlight: {
    				'50': '#fffcee',
    				'100': '#fff7cc',
    				'200': '#ffef99',
    				'300': '#ffe766',
    				'400': '#ffdf33',
    				'500': '#FFD700',
    				'600': '#f0d000',
    				'700': '#e6c200',
    				'800': '#daa520',
    				'900': '#b8860b',
    				DEFAULT: 'hsl(var(--highlight))',
    				foreground: 'hsl(var(--highlight-foreground))'
    			},
    			premium: {
    				'50': '#f5f0f4',
    				'100': '#ebe2e7',
    				'200': '#d9ceda',
    				'300': '#c7bacd',
    				'400': '#b5a6c0',
    				'500': '#a392b3',
    				'600': '#917EA6',
    				'700': '#8a7996',
    				'800': '#7a6a88',
    				'900': '#6b5d7a',
    				DEFAULT: 'hsl(var(--premium))',
    				foreground: 'hsl(var(--premium-foreground))'
    			},
    			success: {
    				'50': '#f0fef2',
    				'100': '#e2fde4',
    				'200': '#bef0cd',
    				'300': '#9ae3b6',
    				'400': '#76d69f',
    				'500': '#52c988',
    				'600': '#2ecc71',
    				'700': '#27ae60',
    				'800': '#229954',
    				'900': '#1e7e34',
    				DEFAULT: 'hsl(var(--success))',
    				foreground: 'hsl(var(--success-foreground))',
    				light: '#e2fde4'
    			},
    			lightBlue: {
    				'50': '#f4f8fb',
    				'100': '#e8f1f8',
    				'200': '#d1e4f0',
    				'300': '#b3cde0',
    				'400': '#7a8ab3',
    				'500': '#5a6ea0',
    				'600': '#4a5d85',
    				'700': '#3a4b73',
    				'800': '#2a3650',
    				'900': '#1f2942'
    			},
    			gray: {
    				'0': '#ffffff',
    				'50': '#fafafa',
    				'100': '#f5f5f5',
    				'200': '#e5e5e5',
    				'300': '#d4d4d4',
    				'400': '#a3a3a3',
    				'500': '#737373',
    				'600': '#525252',
    				'700': '#404040',
    				'800': '#2a3650',
    				'900': '#1f2942'
    			},
    			neutral: {
    				'0': '#ffffff',
    				'50': '#fafafa',
    				'100': '#f5f5f5',
    				'200': '#e5e5e5',
    				'300': '#d4d4d4',
    				'400': '#a3a3a3',
    				'500': '#737373',
    				'600': '#525252',
    				'700': '#404040',
    				'800': '#2a3650',
    				'900': '#1f2942'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))',
    				light: '#fee2e2'
    			},
    			warning: {
    				DEFAULT: '#ea580c',
    				light: '#fed7aa'
    			},
    			error: {
    				DEFAULT: '#dc2626',
    				light: '#fee2e2'
    			},
    			info: {
    				DEFAULT: '#0284c7',
    				light: '#e0f2fe'
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
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
