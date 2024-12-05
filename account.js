const { AccountClient, ListRegionsCommand } = require("@aws-sdk/client-account"); // CommonJS import

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
const client = new AccountClient(config);

async function listRegions() {
    const input = {
     
    };

    const command = new ListRegionsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listRegions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Account: List Regions", error);
        //console.log(error)
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listRegions,
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
           //logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
          //  logger.error(JSON.stringify(error, null, 2))
        }
      }
      saveAllOutputToFile('account.txt')
    }
    // main()

    module.exports = { main };
