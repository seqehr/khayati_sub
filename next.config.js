/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});
const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
};

// module.exports = withPWA({
//   // next.js config
// });
module.exports = nextConfig;
