
import express from "express";
import { WebSocketServer } from "ws";
import * as fs from "fs";
import * as path from "path";
import { parseReactToFigma } from "./utils/ast-parser";

const app = express();
const port = 3000;
const wss = new WebSocketServer({ port: 8080 });

console.log("Starting MCP Bridge Server...");

let activeConnection: any = null;

// --- WebSocket Handling ---
wss.on("connection", (ws) => {
    console.log("✅ Figma Plugin Connected");
    activeConnection = ws;

    ws.on("close", () => {
        console.log("❌ Figma Plugin Disconnected");
        activeConnection = null;
    });
});

// --- HTTP Endpoints ---

// 1. Sync Endpoint (Browser Trigger)
app.get("/sync", async (req, res) => {
    try {
        // 2. Determine file to parse
        const queryFile = req.query.file as string;
        const fallbackFile = "src/pages/ActivityLog.jsx";
        // process.cwd() is mcp-server root. Parent is project root.
        const projectRoot = path.resolve(process.cwd(), "..");

        const filePath = queryFile
            ? path.isAbsolute(queryFile) ? queryFile : path.resolve(projectRoot, queryFile)
            : path.resolve(projectRoot, fallbackFile);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                error: "File not found",
                path: filePath,
                cwd: process.cwd()
            });
        }

        const code = fs.readFileSync(filePath, "utf-8");
        console.log(`Analyzing file: ${path.basename(filePath)}`);

        // Parse AST
        const figmaNode = parseReactToFigma(code);

        if (!figmaNode) {
            return res.status(400).json({ error: "Could not parse React component. No JSX return found." });
        }

        const payload = {
            type: "CREATE_COMPONENT",
            data: figmaNode
        };

        // Send to Figma
        if (activeConnection) {
            activeConnection.send(JSON.stringify(payload));
            return res.json({
                success: true,
                message: "Design sent to Figma!",
                preview: figmaNode
            });
        } else {
            return res.status(503).json({
                error: "Figma Plugin NOT connected.",
                hint: "Please open the plugin in Figma first."
            });
        }

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`
  🚀 Server Ready!
  -----------------------------------------
  1. Open Figma and run the plugin.
  2. Visit this URL to sync:
     http://localhost:3000/sync
  -----------------------------------------
  `);
});
