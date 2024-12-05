const { IotDeviceAdvisorClient, ListSuiteDefinitionsCommand } = require("@aws-sdk/client-iotdeviceadvisor"); // CommonJS import
const config = require('./awsConfig');
const client = new IotDeviceAdvisorClient(config); // Initialize the IoT Device Advisor client
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listSuiteDefinitions() {
    const input = {}; 

    const command = new ListSuiteDefinitionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Suite Definitions List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listSuiteDefinitions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: IotDeviceAdvisor: listSuiteDefinitions", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listSuiteDefinitions,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('iotdeviceadvisor.txt')
    }
    // main()
    module.exports = { main }
