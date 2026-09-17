import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const espnSwid = env.ESPN_SWID_1;
  const espnS2 = env.ESPN_S2_1;

  console.log("ESPN_SWID:", espnSwid ? "loaded" : "missing");
  console.log("ESPN_S2:", espnS2 ? "loaded" : "missing");

  return {
    plugins: [
      react(),
      tailwindcss()
    ],

    server: {
      port: 3000,

      proxy: {
        "/espn-proxy": {
          target: "https://lm-api-reads.fantasy.espn.com",
          changeOrigin: true,
          secure: true,

          rewrite: (path) =>
              path.replace(/^\/espn-proxy/, ""),

          configure: (proxy) => {

            proxy.on("proxyReq", (proxyRequest, request) => {

              if (espnSwid && espnS2) {
                proxyRequest.setHeader(
                    "Cookie",
                    `SWID=${espnSwid}; espn_s2=${espnS2}`
                );
              }

              proxyRequest.setHeader(
                  "Accept",
                  "application/json"
              );

              proxyRequest.setHeader(
                  "User-Agent",
                  "Mozilla/5.0"
              );

              console.log(
                  `[ESPN] ${request.method} ${request.url}`
              );
            });

            proxy.on("proxyRes", (proxyResponse, request) => {
              console.log(
                  `[ESPN] ${proxyResponse.statusCode} ${request.url}`
              );
            });

            proxy.on("error", (error) => {
              console.error(
                  "[ESPN] Proxy error:",
                  error.message
              );
            });
          }
        }
      }
    }
  };
});