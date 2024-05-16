/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // output:'export',
  // distDir: 'dist',
  // basePath: '/randomcat_evo',
  // assetPrefix: '/randomcat_evo/',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}
  
  export default nextConfig;