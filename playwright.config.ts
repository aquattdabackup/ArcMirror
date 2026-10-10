import { defineConfig, devices } from "@playwright/test";

const remote = process.env.E2E_BASE_URL;
const rpcUnavailable = process.env.E2E_RPC_UNAVAILABLE === "1";
if (rpcUnavailable && (remote || process.env.E2E_LIVE === "1")) {
  throw new Error("RPC outage checks require a local server and cannot run as live mainnet checks.");
}
export default defineConfig({
  testDir: "./e2e",
  testIgnore: [
    ...(process.env.E2E_LIVE === "1" ? [] : ["**/live.spec.ts"]),
    ...(rpcUnavailable ? [] : ["**/rpc-outage.spec.ts"]),
  ],
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: remote ?? "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    acceptDownloads: true,
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
  webServer: remote ? undefined : {
    command: "npm run start --workspace @arcmirror/web -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100/api/health",
    reuseExistingServer: false,
    timeout: 60_000,
    ...(rpcUnavailable ? { env: {
      ARC_RPC_URLS: "http://127.0.0.1:1",
      ARC_TRACE_RPC_URLS: "http://127.0.0.1:1",
    } } : {}),
  },
});
