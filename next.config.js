const APPROVED_API_BASE_URLS = new Set([
	"https://api.mettyeung27.org/api/v1",
	"https://api.uat.mettyeung27.org/api/v1",
	"http://localhost:8000/api/v1", // local Docker testing (browser)
	"http://api:8000/api/v1", // local Docker testing (server-side/SSR)
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

function getApiImagePatterns() {
	const patterns = [];
	const configuredBaseUrl = normalizeBaseUrl(
		process.env.NEXT_PUBLIC_AUTH_BASE_URL
	);

	if (!configuredBaseUrl || !APPROVED_API_BASE_URLS.has(configuredBaseUrl)) {
		if (process.env.NODE_ENV === "production") {
			throw new Error(
				"NEXT_PUBLIC_AUTH_BASE_URL must be an approved HTTPS API URL"
			);
		}

		patterns.push({
			protocol: "https",
			hostname: "api.mettyeung27.org",
			port: "",
			pathname: "/api/v1/media/view/**",
		});
		return patterns;
	}

	const url = new URL(configuredBaseUrl);
	patterns.push({
		protocol: url.protocol.replace(":", ""),
		hostname: url.hostname,
		port: url.port || "",
		pathname: `${url.pathname}/media/view/**`,
	});

	// AUTH_BASE_URL is injected only when the UI container starts, while this
	// configuration is compiled during the image build. When the public local
	// URL is localhost, pre-allow the Docker network hostname used by SSR and
	// the next/image optimizer at runtime.
	if (url.protocol === "http:" && url.hostname === "localhost" && url.port === "8000") {
		patterns.push({
			protocol: "http",
			hostname: "api",
			port: "8000",
			pathname: `${url.pathname}/media/view/**`,
		});
	}

	// In Docker, next/image runs server-side and needs to reach the API via
	// the internal Docker hostname (AUTH_BASE_URL), not localhost.
	const serverBaseUrl = normalizeBaseUrl(process.env.AUTH_BASE_URL);
	if (serverBaseUrl && serverBaseUrl !== configuredBaseUrl && APPROVED_API_BASE_URLS.has(serverBaseUrl)) {
		const serverUrl = new URL(serverBaseUrl);
		patterns.push({
			protocol: serverUrl.protocol.replace(":", ""),
			hostname: serverUrl.hostname,
			port: serverUrl.port || "",
			pathname: `${serverUrl.pathname}/media/view/**`,
		});
	}

	return patterns;
}

function getCspHeader() {
	const configuredBaseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_AUTH_BASE_URL);
	const apiOrigin = configuredBaseUrl && APPROVED_API_BASE_URLS.has(configuredBaseUrl)
		? new URL(configuredBaseUrl).origin
		: "https://api.mettyeung27.org";
	const isDevelopment = process.env.NODE_ENV === "development";
	const isLocalHttp = apiOrigin.startsWith("http://");

	return [
		"default-src 'self'",
		"base-uri 'self'",
		"object-src 'none'",
		"frame-ancestors 'none'",
		"form-action 'self'",
		// App Router emits build-time inline bootstrap scripts for static/ISR pages.
		// SRI protects generated external bundles; a nonce CSP would force these pages
		// back to per-request dynamic rendering.
		`script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
		"style-src 'self' 'unsafe-inline'",
		`connect-src 'self' ${apiOrigin}`,
		`img-src 'self' data: blob: ${apiOrigin} https://i.ytimg.com https://img.youtube.com https://images.pexels.com https://randomuser.me`,
		"frame-src https://www.google.com https://www.youtube.com",
		"font-src 'self' data:",
		"worker-src 'self' blob:",
		...(!isDevelopment && !isLocalHttp ? ["upgrade-insecure-requests"] : []),
	].join("; ");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	compress: true,
	poweredByHeader: false,
	experimental: {
		sri: {
			algorithm: "sha384",
		},
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60,
		remotePatterns: [
			...getApiImagePatterns(),
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
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "/photos/**",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "Content-Security-Policy", value: getCspHeader() },
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
