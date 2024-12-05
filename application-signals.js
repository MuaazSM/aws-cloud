const { ApplicationSignalsClient, ListServiceLevelObjectivesCommand } = require("@aws-sdk/client-application-signals"); // CommonJS import

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new ApplicationSignalsClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listServiceLevelObjectives() {
    const input = {
    };

    const command = new ListServiceLevelObjectivesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listServiceLevelObjectives ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationSignals: listServiceLevelObjectives", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listServiceLevelObjectives,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('application-signal.txt')
    }
    //main()
    module.exports = { main };