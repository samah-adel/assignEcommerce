
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ecommerce.routemisr.com'], // السماح بعرض الصور من هذا الدومين
  },
  reactStrictMode: true, // تحسين الأداء وإظهار الأخطاء في التطوير
  experimental: {
    appDir: true, // دعم هيكل المجلد الجديد في Next.js
  },
};

export default nextConfig;