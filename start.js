import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// function to start service
function startService(serviceName, command) {
  return new Promise((resolve, reject) => {
    const service = spawn("node --watch", [command], {
      stdio: "inherit",
      shell: true,
    });

    service.on("error", (error) => {
      console.error(`failed to start ${serviceName}:`, error);
      reject(error);
    });

    // give some time to initialize
    setTimeout(() => {
      console.log(`${serviceName} started`);
      resolve();
    }, 2000);
  });
}

// start services in order
async function startAllServices() {
  try {
    console.log("starting all services...");

    // start ContentService first
    await startService(
      "ContentService",
      join(__dirname, "ContentService/ContentService.js")
    );

    // then start UserService
    await startService(
      "UserService",
      join(__dirname, "UserService/UserService.js")
    );

    // finally start API Gateway
    await startService(
      "API Gateway",
      join(__dirname, "api-gateway/API_Gateway.js")
    );

    console.log("all services started successfully!");
  } catch (error) {
    console.error("error starting services:", error);
    process.exit(1);
  }
}

startAllServices();
