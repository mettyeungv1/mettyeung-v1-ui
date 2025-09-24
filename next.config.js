/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		output: "standalone",
		ignoreDuringBuilds: true,
	},
	images: { unoptimized: true },
};

module.exports = nextConfig;
