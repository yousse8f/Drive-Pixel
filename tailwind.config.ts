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
    			'midnight-blue': '#0F1C3F',
    			'royal-blue': '#1E3A8A',
    			'muted-indigo': '#2D3A6B',
    			'metallic-gold': '#D4AF37',
    			'pale-goldenrod': '#F5E6A1',
    			'amber': '#FFBF00',
    			'burnt-orange': '#C1440E',
    			'terra-cotta': '#B65F3A',
    			'dark-russet': '#8A3324',
    			'sea-green': '#2E8B57',
    			'dark-olive': '#556B2F',
    			'off-white': '#F8F4EF',
    			'light-beige': '#EDE6DA',
    			'warm-grey': '#DCD6C9',
    			'royal-purple': '#6A0DAD',
    			primary: {
    				'50': '#f0f4ff',
    				'100': '#e0e9ff',
    				'200': '#c7d7fe',
    				'300': '#a5bbfc',
    				'400': '#8199f8',
    				'500': '#1E3A8A',
    				'600': '#1a3278',
    				'700': '#162a66',
    				'800': '#122254',
    				'900': '#0F1C3F',
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				'50': '#f4f6fa',
    				'100': '#e8ecf5',
    				'200': '#d1d9eb',
    				'300': '#b3c0db',
    				'400': '#7a8ab3',
    				'500': '#2D3A6B',
    				'600': '#283360',
    				'700': '#232c55',
    				'800': '#1e254a',
    				'900': '#191e3f',
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			cta: {
    				'50': '#fdfbf3',
    				'100': '#fbf7e7',
    				'200': '#f7efcf',
    				'300': '#f3e7b7',
    				'400': '#efdf9f',
    				'500': '#D4AF37',
    				'600': '#c09d2f',
    				'700': '#ac8b27',
    				'800': '#98791f',
    				'900': '#846717',
    				DEFAULT: 'hsl(var(--cta))',
    				foreground: 'hsl(var(--cta-foreground))'
    			},
    			highlight: {
    				'50': '#fffef5',
    				'100': '#fffceb',
    				'200': '#fff9d6',
    				'300': '#fff5c2',
    				'400': '#fff2ad',
    				'500': '#FFBF00',
    				'600': '#e6ac00',
    				'700': '#cc9900',
    				'800': '#b38600',
    				'900': '#997300',
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
    				'50': '#f0f9f4',
    				'100': '#e1f3e9',
    				'200': '#c3e7d3',
    				'300': '#a5dbbd',
    				'400': '#87cfa7',
    				'500': '#2E8B57',
    				'600': '#297d4e',
    				'700': '#246f45',
    				'800': '#1f613c',
    				'900': '#1a5333',
    				DEFAULT: 'hsl(var(--success))',
    				foreground: 'hsl(var(--success-foreground))',
    				light: '#e1f3e9'
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
