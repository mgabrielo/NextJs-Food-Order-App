/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
            },
            {
                protocol: 'https',
                hostname: 'nextjs-food-order.s3.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
