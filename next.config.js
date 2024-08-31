/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}


// next.config.js
module.exports = {
  images: {
    domains: ['images.ctfassets.net'], // Thêm tên miền của bạn ở đây
  },
};

module.exports = nextConfig