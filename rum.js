const { RUMClient, ListAppMonitorsCommand } = require("@aws-sdk/client-rum"); // CommonJS import
const config = require('./awsConfig');  // Your AWS config file
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

// Create an instance of the RUMClient with your AWS configuration
const client = new RUMClient(config);

async function listAppMonitors() {
    const input = {};

    const command = new ListAppMonitorsCommand(input);

    try {
        const response = await client.send(command);  // Send the command and wait for the response

        console.log("App Monitors:", JSON.stringify(response, null, 2));  
        accumulatedOutput += `\n--- listAppMonitors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: RUM: listAppMonitors", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAppMonitors,    

    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('rum.txt')
    
    }
// main()

module.exports = { main };
