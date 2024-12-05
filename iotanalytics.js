const { IoTAnalyticsClient, ListChannelsCommand } = require("@aws-sdk/client-iotanalytics"); // CommonJS import
const config = require('./awsConfig');
const client = new IoTAnalyticsClient(config); // Initialize the IoT Analytics client
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listChannels() {
    const input = {}; 

    const command = new ListChannelsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Channels List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listChannels ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: IoTAnalytics: listChannels", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listChannels,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('iotanalytics.txt')
    }
    // main()
    module.exports = { main }