/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    basePath: '/Drive-Pixel',
    assetPrefix: '/Drive-Pixel',
    async rewrites() {
        return [
            {
                source: '/api/auth/:path*',
                destination: 'http://localhost:5000/api/auth/:path*',
            },
            {
                source: '/api/users/:path*',
                destination: 'http://localhost:5000/api/users/:path*',
            },
            {
                source: '/api/leads/:path*',
                destination: 'http://localhost:5000/api/leads/:path*',
            },
            {
                source: '/api/properties/:path*',
                destination: 'http://localhost:5000/api/properties/:path*',
            },
            {
                source: '/api/cart/:path*',
                destination: 'http://localhost:5000/api/cart/:path*',
            },
            {
                source: '/api/public/:path*',
                destination: 'http://localhost:5000/api/public/:path*',
            },
            {
                source: '/api/admin/:path*',
                destination: 'http://localhost:5000/api/admin/:path*',
            },
            {
                source: '/api/payments/:path*',
                destination: 'http://localhost:5000/api/payments/:path*',
            },
            {
                source: '/api/paypal/:path*',
                destination: 'http://localhost:5000/api/paypal/:path*',
            },
            {
                source: '/api/products/:path*',
                destination: 'http://localhost:5000/api/products/:path*',
            },
            {
                source: '/api/orders/:path*',
                destination: 'http://localhost:5000/api/orders/:path*',
            },
            {
                source: '/api/customers/:path*',
                destination: 'http://localhost:5000/api/customers/:path*',
            },
            {
                source: '/api/newsletter/:path*',
                destination: 'http://localhost:5000/api/newsletter/:path*',
            },
            {
                source: '/api/contact/:path*',
                destination: 'http://localhost:5000/api/contact/:path*',
            },
            {
                source: '/api/chat/:path*',
                destination: 'http://localhost:5000/api/chat/:path*',
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    onDemandEntries: {
        maxInactiveAge: 60 * 1000,
        pagesBufferLength: 5,
    },
};

module.exports = nextConfig;
