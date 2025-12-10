import { neon } from "@neondatabase/serverless";

import "dotenv/config";
import http from "http";
import { IncomingMessage, ServerResponse } from "http";

export const sql = neon(process.env.DATABASE_URL!);

interface VersionResult {
    version: string;
}

const requestHandler = async (
    req: IncomingMessage,
    res: ServerResponse
): Promise<void> => {
    const result = await sql`SELECT version()`;
    const { version } = result[0] as VersionResult;
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(version);
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});