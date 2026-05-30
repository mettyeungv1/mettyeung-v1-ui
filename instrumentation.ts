export async function register() {
  // Only run on the server side (Node.js runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    installFatalErrorExitHandlers();

    const { setGlobalDispatcher, Agent } = await import("undici");
    setGlobalDispatcher(
      new Agent({
        // 1. Force close connections after 10s (Must be < Nginx's 300s/60s)
        keepAliveTimeout: 10000,
        
        // 2. Kill stuck headers parsing after 10s
        headersTimeout: 10000,
        
        // 3. CRITICAL: Disable pipelining. 
        // Ensures requests are strictly ordered and easier to tear down safely.
        pipelining: 0,
      })
    );
  }
}

function installFatalErrorExitHandlers() {
  const globalKey = "__myaFatalHandlersInstalled";
  const globalState = globalThis as typeof globalThis & Record<string, boolean>;

  if (globalState[globalKey]) return;
  globalState[globalKey] = true;

  const exitAfterLog = (type: string, error: unknown) => {
    console.error(`[Fatal] ${type}`, error);
    setImmediate(() => process.exit(1));
  };

  process.on("uncaughtException", (error) => {
    exitAfterLog("uncaughtException", error);
  });
  process.on("unhandledRejection", (reason) => {
    exitAfterLog("unhandledRejection", reason);
  });
}
