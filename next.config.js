/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	experimental: {
		instrumentationHook: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.mettyeung27.org",
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
};

module.exports = nextConfig;
