const JSON_SCRIPT_ESCAPES: Record<string, string> = {
	"<": "\\u003c",
	">": "\\u003e",
	"&": "\\u0026",
	"\u2028": "\\u2028",
	"\u2029": "\\u2029",
};

/** Serialize structured data without allowing an HTML script element breakout. */
export function serializeJsonForScript(value: unknown): string {
	return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) =>
		JSON_SCRIPT_ESCAPES[character]
	);
}
