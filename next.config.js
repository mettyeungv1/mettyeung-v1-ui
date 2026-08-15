const APPROVED_API_BASE_URLS = new Set([
	"https://api.mettyeung27.org/api/v1",
	"https://api.uat.mettyeung27.org/api/v1",
	"http://localhost:8000/api/v1", // local Docker testing
]);

function normalizeBaseUrl(value) {
	if (!value) return null;

	try {
		const url = new URL(value);
		url.hash = "";
		url.search = "";
		return `${url.origin}${url.pathname.replace(/\/$/, "")}`;
	} catch {
		return null;
	}
}

function getApiImagePattern() {
	const configuredBaseUrl = normalizeBaseUrl(
		process.env.NEXT_PUBLIC_AUTH_BASE_URL
	);

	if (!configuredBaseUrl || !APPROVED_API_BASE_URLS.has(configuredBaseUrl)) {
		if (process.env.NODE_ENV === "production") {
			throw new Error(
				"NEXT_PUBLIC_AUTH_BASE_URL must be an approved HTTPS API URL"
			);
		}

		return {
			protocol: "https",
			hostname: "api.mettyeung27.org",
			port: "",
			pathname: "/api/v1/media/view/**",
		};
	}

	const url = new URL(configuredBaseUrl);
	return {
		protocol: url.protocol.replace(":", ""),
		hostname: url.hostname,
		port: url.port || "",
		pathname: `${url.pathname}/media/view/**`,
	};
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	compress: true,
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: false,
	},
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60,
		remotePatterns: [
			getApiImagePattern(),
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				port: "",
				pathname: "/vi/**",
			},
			{
				protocol: "https",
				hostname: "img.youtube.com",
				port: "",
				pathname: "/vi/**",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value:
							"camera=(), microphone=(), geolocation=(), clipboard-write=(self)",
					},
					{ key: "Cross-Origin-Opener-Policy", value: "same-origin" },
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000",
					},
				],
			},
		];
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
