/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOST_ACCOUNT: process.env.HOST_ACCOUNT,
    HOST_PRODUCT: process.env.HOST_PRODUCT,
    HOST_CATEGORY: process.env.HOST_CATEGORY,
    HOST_CART: process.env.HOST_CART,
    HOST_ORDER: process.env.HOST_ORDER,
  },
};

export default nextConfig;
