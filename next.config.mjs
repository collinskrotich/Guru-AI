// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     async rewrites() {
//         return [
//           {
//             source: '/api/:path*',
//             destination: 'https://w7fvpvogr6.execute-api.eu-west-1.amazonaws.com/UAT/api/:path*',
//           },
//         ]
//       },
// };

// export default nextConfig;
// https://kf0bl71x31.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/retail-product-recommendation-service,  "prompt":"What is Safaricom Telematics Monthly Service?"

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/Enterpise-AI-Search/:path*',
        destination: 'https://w7fvpvogr6.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/Enterpise-AI-Search/:path*',
      },
      {
        source: '/api/v1/retail-product-recommendation-service/:path*',
        destination: 'https://kf0bl71x31.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/retail-product-recommendation-service/:path*',
      },
      {
        source: '/api/v1/DIY-Studio/:path*',
        destination: 'https://2qup072pu4.execute-api.eu-west-1.amazonaws.com/sandbox/:path*',
      },
    ];
  },
};

export default nextConfig;

