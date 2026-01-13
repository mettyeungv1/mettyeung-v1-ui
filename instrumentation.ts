export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const { setGlobalDispatcher, Agent } = await import("undici");
		setGlobalDispatcher(
			new Agent({
				keepAliveTimeout: 10000,
				headersTimeout: 10000,
			})
		);
	}
}
