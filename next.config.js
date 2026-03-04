/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix: tell Turbopack this folder is the workspace root
  // (prevents "multiple lockfiles" warning from parent directory)
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
};

module.exports = nextConfig;
