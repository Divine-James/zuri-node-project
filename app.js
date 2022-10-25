const path = require("path");
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  let filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "home.html" : req.url
  );
  let contentType = getContentType(filepath) || "text/html";
  let emptyPagePath = path.join(__dirname, "public", "404.html");
  fs.readFile(filepath, "utf8", (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(emptyPagePath, "utf8", (err, content) => {
          res.writeHead(200, { "Content-type": contentType });
          res.end(content);
        });
      } else {
        res.writeHead(500);
        res.end("a server error occured");
      }
    }
    if (!err) {
      res.writeHead(200, { "Content-type": contentType });
      res.end(content);
    }
  });
});

const getContentType = (filepath) => {
  let extname = path.extname(filepath);
  if (extname === ".js") {
    return "test/javascript";
  }
  if (extname === ".css") {
    return "text/css";
  }
  if (extname === ".png") {
    return "image/png";
  }
  if (extname === ".jpg") {
    return "image/jpg";
  }
};

const port = 8080;

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

/*
  if (req.url === "/") {
    let filepath = path.join(__dirname, "public", "index.html");
    fs.readFile(filepath, "utf8", (err, data) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    });
  }
  if (req.url === "/index2.html") {
    let filepath = path.join(__dirname, "public", "index2.html");
    fs.readFile(filepath, "utf8", (err, data) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    });
  }
*/
