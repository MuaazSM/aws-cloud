const { SSMClient, DescribePatchBaselinesCommand } = require("@aws-sdk/client-ssm"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file (AWS credentials)
const client = new SSMClient(config); // Create the client using the configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describePatchBaselines() {
    const input = {};

    const command = new DescribePatchBaselinesCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Patch Baselines:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describePatchBaselines ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: SSM: describePatchBaselines", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        describePatchBaselines,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('ssm.txt')
    }
    //  main()
    module.exports = { main };
