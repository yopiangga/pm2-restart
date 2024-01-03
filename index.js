const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! q");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

process.on("message", async function (msg) {
  if (msg !== "shutdown") return;

  isAppClosed = true;
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  console.log("Closing the app!");
  server.close(() => {
    console.log("Closed out remaining connections of the express server.");
    process.exit(0);
  });
});
