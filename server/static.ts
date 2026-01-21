import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  // Path to the public directory containing static HTML/CSS/JS
  const publicPath = path.resolve(__dirname, "..", "client", "public");
  
  // Serve the static files from the public directory
  if (fs.existsSync(publicPath)) {
    // index: true is default for express.static
    app.use(express.static(publicPath));
  }

  // Catch-all route to serve the static index.html
  app.get("*", (req, res, next) => {
    // Only serve index.html for non-API routes
    if (req.path.startsWith("/api")) {
      return next();
    }

    const indexPath = path.resolve(publicPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Not Found");
    }
  });
}
