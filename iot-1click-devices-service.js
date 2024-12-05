const { IoT1ClickDevicesServiceClient, ListDevicesCommand } = require("@aws-sdk/client-iot-1click-devices-service"); // CommonJS import
const config = require('./awsConfig');
const client = new IoT1ClickDevicesServiceClient(config); // Initialize the IoT 1-Click Devices Service clien
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listDevices() {
    const input = {}; 

    const command = new ListDevicesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Devices List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDevices ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: IoT1ClickDevicesService: List Devices", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listDevices,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('iot-1click-devices-service.txt')
}


//  main();

module.exports = { main };
