/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                hostname: 'assets.tina.io'
            }
        ] 
    }
};

export default nextConfig;
