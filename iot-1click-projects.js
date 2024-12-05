const { IoT1ClickProjectsClient, ListProjectsCommand } = require("@aws-sdk/client-iot-1click-projects"); // CommonJS import
const config = require('./awsConfig');
const client = new IoT1ClickProjectsClient(config); // Initialize the IoT 1-Click Projects client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listProjects() {
    const input = {}; 

    const command = new ListProjectsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Projects List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listProjects ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: IoT1ClickProjects: List Projects", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listProjects,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('iot-1click-projects.txt')
}

// main();

module.exports = { main };
