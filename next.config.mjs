/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://w7fvpvogr6.execute-api.eu-west-1.amazonaws.com/UAT/api/:path*',
          },
        ]
      },
};

export default nextConfig;
