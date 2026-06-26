import { defineCommand } from "citty";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";

const DIST_DIR = resolve("./dist");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

export const previewCommand = defineCommand({
  meta: {
    name: "preview",
    description: "Start preview server for built HTML",
  },
  args: {
    port: { type: "string", alias: "p", default: "3000", description: "Port to listen on" },
    host: { type: "string", default: "localhost", description: "Host to bind to" },
    open: { type: "boolean", alias: "o", default: true, description: "Open browser on start" },
  },
  async run({ args }) {
    // Verify dist exists
    if (!existsSync(DIST_DIR)) {
      console.error("❌ dist/ not found. Run 'pob build' first.");
      process.exit(1);
    }

    const port = parseInt(args.port, 10);
    const host = args.host ?? "localhost";

    console.log(`🌐 pob preview server\n`);
    console.log(`   Local:   http://${host}:${port}`);
    console.log(`   Network: http://0.0.0.0:${port}\n`);

    // Open browser
    if (args.open) {
      Bun.$`open http://${host}:${port}`;
    }

    // Start server
    const server = Bun.serve({
      port,
      hostname: host,
      async fetch(req) {
        const url = new URL(req.url);
        let path = url.pathname;

        // Root → index.html
        if (path === "/") {
          path = "/index.html";
        }

        // Clean path (prevent directory traversal)
        path = path.replace(/\.\./g, "");

        const filePath = join(DIST_DIR, path);

        // Check if file exists
        if (!existsSync(filePath)) {
          return new Response("Not Found", { status: 404 });
        }

        const stat = statSync(filePath);

        // Directory → index.html in that directory
        if (stat.isDirectory()) {
          const indexPath = join(filePath, "index.html");
          if (existsSync(indexPath)) {
            const content = readFileSync(indexPath);
            return new Response(content, {
              headers: { "Content-Type": "text/html" },
            });
          }
          // List directory
          const files = readdirSync(filePath);
          const html = `<!DOCTYPE html>
<html><head><title>Index</title></head>
<body><h1>Index of ${path}</h1>
<ul>${files.map(f => `<li><a href="${path}/${f}">${f}</a></li>`).join("")}</ul>
</body></html>`;
          return new Response(html, { headers: { "Content-Type": "text/html" } });
        }

        // Serve file
        const ext = extname(filePath);
        const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
        const content = readFileSync(filePath);

        return new Response(content, {
          headers: { "Content-Type": contentType },
        });
      },
    });

    console.log(`Server running at http://${server.hostname}:${server.port}\n`);

    // Keep alive
    await new Promise(() => {});
  },
});