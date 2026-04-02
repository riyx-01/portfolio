/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', 'smooothy'],
  reactStrictMode: false,
  distDir: 'dev_build', // Changed to bypass EPERM OneDrive sync logs
};

export default nextConfig;
