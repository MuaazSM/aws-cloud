const { ControlTowerClient, ListBaselinesCommand } = require("@aws-sdk/client-controltower"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new ControlTowerClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listBaselines(nextToken = null, maxResults = null) {
    const input = {};

    const command = new ListBaselinesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Baselines:", JSON.stringify(response, null, 2));
        accumulatedOutput += `\n--- listBaselines ---\n${JSON.stringify(response, null, 2)}\n`;
 
    } catch (error) {
        logger.error("Error: ControlTower: ListBaselines", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listBaselines,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('controltower.txt')
    }
    //  main()

module.exports = { main };
