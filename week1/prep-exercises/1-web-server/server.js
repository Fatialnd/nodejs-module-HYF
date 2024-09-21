/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
};

const server = http.createServer(async (req, res) => {
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  let ext = path.extname(filePath);
  let contentType = mimeTypes[ext] || "text/plain";

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404: File Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
