const { AppFabricClient, ListAppBundlesCommand } = require("@aws-sdk/client-appfabric"); // CommonJS import
const logger = require('./logger')

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AppFabricClient(config);
const fs = require('fs'); 
let accumulatedOutput = '';

async function listAppBundles() {
    const input = {
      
    };

    const command = new ListAppBundlesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listAppBundles ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppFabric: listAppBundles", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }


async function main() {
    const functionsToExecute = [
        listAppBundles,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('appfabric.txt')
    }
    // main()
    module.exports = { main };