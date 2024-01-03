const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! satu menit");
});

// Function to execute shell commands
const executeCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Function to update and restart the application
const updateAndRestart = async () => {
  try {
    // Step 1: Update the application with git pull
    console.log("Updating the application with git pull...");
    await executeCommand("git pull origin master");

    // Step 2: Restart the application with pm2 restart
    console.log("Restarting the application with pm2 restart...");
    await executeCommand("pm2 restart pm2-restart-app"); // Replace 'your-app' with your PM2 process name

    console.log("Update and restart completed successfully.");
  } catch (error) {
    console.error(`Error during update and restart: ${error}`);
  }
};

setInterval(updateAndRestart, 60000);

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
