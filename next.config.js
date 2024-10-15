/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permitir imágenes de cualquier dominio
      },
    ],
  },
}

module.exports = nextConfig