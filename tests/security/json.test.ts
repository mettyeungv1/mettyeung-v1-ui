import assert from "node:assert/strict";
import test from "node:test";

import { serializeJsonForScript } from "../../lib/security/json.ts";

test("serializeJsonForScript prevents script element breakouts", () => {
	const serialized = serializeJsonForScript({
		title: "</script><script>alert(1)</script>",
		separator: "line\u2028paragraph\u2029",
	});

	assert.equal(serialized.includes("</script>"), false);
	assert.equal(serialized.includes("<script>"), false);
	assert.match(serialized, /\\u003c\/script\\u003e/);
	assert.match(serialized, /\\u2028/);
	assert.match(serialized, /\\u2029/);
});
