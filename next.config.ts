import withPWA from "next-pwa";
// import type { NextConfig } from 'next';

const nextConfig = {
  // async headers() {
  // 	return [
  // 		{
  // 			source: '/:path*', // Apply to all paths
  // 			headers: [
  // 				{
  // 					key: 'Content-Security-Policy',
  // 					value: `
  // 			  default-src 'self';
  // 			`
  // 						.replace(/\s{2,}/g, ' ')
  // 						.trim(), // Remove extra whitespace for cleaner header
  // 				},
  // 			],
  // 		},
  // 	];
  // },
};

export default withPWA({
  /* config options here */
  // devIndicators: false,
  dest: "public",
  disable: false,
  register: true,
  skipWaiting: true,
})(nextConfig);
