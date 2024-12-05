const { CloudHSMClient, ListAvailableZonesCommand, ListHapgsCommand, ListLunaClientsCommand } = require("@aws-sdk/client-cloudhsm"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

const client = new CloudHSMClient(config);

async function listAvailableZones() {
  const input = {}; // Keep the input empty as no parameters are necessary

  const command = new ListAvailableZonesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Available Zones:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listAvailableZones ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudHSM: List Available Zones", error);
  }
}

async function listHapgs() {
    const input = {};

    const command = new ListHapgsCommand(input);

    try {
      const response = await client.send(command);
      console.log("HAPGs:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listHapgs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CloudHSM: List HAPGs", error);
    }
}

async function listLunaClients() {
    const input = {};

    const command = new ListLunaClientsCommand(input);

    try {
      const response = await client.send(command);
      console.log("Luna Clients:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listLunaClients ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CloudHSM: List Luna Clients", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAvailableZones,    
        listHapgs,
        listLunaClients, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('cloudhsm.txt')
}
 //main()
module.exports = { main };
