import { TunnelServer } from "https://raw.githubusercontent.com/boronine/h2tunnel/refs/heads/main/src/h2tunnel.ts";

const controller = new AbortController();

// Import key creds
const cert = await Deno.readTextFile("./h2tunnel.crt");
const key = await Deno.readTextFile("./h2tunnel.key");

const server = new TunnelServer({
  logger: (line: any) => console.log(line), // optional
  tunnelListenIp: "0.0.0.0",
  tunnelListenPort: 15001,
  key,
  cert,
  proxyListenPort: 80,
  proxyListenIp: "0.0.0.0",
  muxListenPort: 15002,
});

// Start the server
server.start();

controller.signal.addEventListener("abort", async () => {
  // Stop the server
  await server.stop();
});
