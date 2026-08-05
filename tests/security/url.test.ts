import assert from "node:assert/strict";
import test from "node:test";

import {
	createGoogleMapsEmbedUrl,
	createGoogleMapsLocationUrl,
	safeExternalHttpsUrl,
	safeNavigationHref,
} from "../../lib/security/url.ts";
import { normalizeUrl } from "../../lib/utils/image.ts";

test("safeExternalHttpsUrl only accepts absolute HTTPS URLs", () => {
	assert.equal(safeExternalHttpsUrl("javascript:alert(1)"), null);
	assert.equal(safeExternalHttpsUrl("data:text/html,test"), null);
	assert.equal(safeExternalHttpsUrl("//example.com"), null);
	assert.equal(safeExternalHttpsUrl("http://example.com"), null);
	assert.equal(safeExternalHttpsUrl("https://example.com/path"), "https://example.com/path");
});

test("safeNavigationHref accepts local paths and HTTPS destinations", () => {
	assert.equal(safeNavigationHref("/news/1"), "/news/1");
	assert.equal(safeNavigationHref("//example.com/path"), null);
	assert.equal(safeNavigationHref("javascript:alert(1)"), null);
	assert.equal(safeNavigationHref("https://example.com"), "https://example.com/");
});

test("createGoogleMapsEmbedUrl ignores invalid and out-of-range coordinates", () => {
	const malicious = createGoogleMapsEmbedUrl("javascript:alert(1)", "999");
	const maliciousUrl = new URL(malicious);
	assert.equal(maliciousUrl.origin, "https://www.google.com");
	assert.equal(maliciousUrl.pathname, "/maps");
	assert.equal(maliciousUrl.searchParams.get("q"), "11.595197,104.901852");
	assert.equal(maliciousUrl.searchParams.get("output"), "embed");

	const valid = new URL(createGoogleMapsEmbedUrl("12.5", "103.25"));
	assert.equal(valid.searchParams.get("q"), "12.5,103.25");
});

test("createGoogleMapsLocationUrl validates database coordinates", () => {
	const url = new URL(createGoogleMapsLocationUrl("javascript:alert(1)", "999"));
	assert.equal(url.origin, "https://www.google.com");
	assert.equal(url.searchParams.get("query"), "11.595197,104.901852");
});

test("normalizeUrl blocks database-controlled image origins and internal hosts", () => {
	assert.equal(normalizeUrl("https://evil.example/pixel.png"), "");
	assert.equal(normalizeUrl("https://api.mettyeung27.org/private"), "");
	assert.equal(normalizeUrl("/local/image.png"), "/local/image.png");
	assert.equal(
		normalizeUrl(
			"http://backend:8000/api/v1/media/view/123e4567-e89b-42d3-a456-426614174000.png"
		),
		"https://api.mettyeung27.org/api/v1/media/view/123e4567-e89b-42d3-a456-426614174000.png"
	);
});
