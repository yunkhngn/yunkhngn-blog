/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["vi"],
    defaultLocale: "vi",
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    SERVICE_ID: process.env.SERVICE_ID,
    TEMPLATE_ID: process.env.TEMPLATE_ID,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    TRACKING_ID: process.env.TRACKING_ID,
  },
  images: {
    deviceSizes: [440, 540, 640, 828, 1080, 1280, 1400, 1536, 1700, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 374],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '**/**/**/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  webpack: (config) => {
    config.optimization.minimize = true; // Bật tối ưu hóa cho Webpack
    config.plugins.push(
      new (require('compression-webpack-plugin'))({
        filename: '[file].gz', // Đặt tên file nén
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/, // Các định dạng file để nén
        threshold: 10240, // Nén file lớn hơn 10kB
        minRatio: 0.8, // Tỉ lệ tối thiểu
      })
    );
    return config;
  },
}

module.exports = nextConfig

const withVercelToolbar = require('@vercel/toolbar/plugins/next')();
// Instead of module.exports = nextConfig, do this:
module.exports = withVercelToolbar(nextConfig);