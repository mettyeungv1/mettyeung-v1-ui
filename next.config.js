/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	compress: true,
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.mettyeung27.org",
			},
			{
				protocol: "https",
				hostname: "api.uat.mettyeung27.org",
			},
			{
				protocol: "http",
				hostname: "backend",
			},
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/Partners",
				destination: "/partners",
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: "/partners",
				destination: "/network",
			},
		];
	},
};

module.exports = nextConfig;
