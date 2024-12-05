const { CloudTrailClient, ListChannelsCommand, ListEventDataStoresCommand, ListTrailsCommand } = require("@aws-sdk/client-cloudtrail"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = ''; 
// Initialize the CloudTrailClient outside the function
const client = new CloudTrailClient(config);

async function listChannels() {
  const input = {};

  const command = new ListChannelsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Channels List:", JSON.stringify(response, null, 2)); // Pretty print the response
  } catch (error) {
    logger.error("Error: CloudTrail: List Channels", error);
  }
}

async function listEventDataStores() {
    const input = {};
  
    const command = new ListEventDataStoresCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("Event Data Stores List:", JSON.stringify(response, null, 2)); // Pretty print the response
    } catch (error) {
      logger.error("Error: CloudTrail: List Event Data Stores", error);
    }
}
  
async function listTrails() {
    const input = {};
  
    const command = new ListTrailsCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("Trails List:", JSON.stringify(response, null, 2)); // Pretty print the response
    } catch (error) {
      logger.error("Error: CloudTrail: List Trails", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listChannels,    
        listEventDataStores,
        listTrails,  
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('cloudtrail.txt')
    }
    //main()
    module.exports = { main };
