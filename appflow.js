const { AppflowClient, ListConnectorsCommand, ListFlowsCommand,  } = require("@aws-sdk/client-appflow"); // CommonJS import
const logger = require('./logger')

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AppflowClient(config);
const fs = require('fs'); 
let accumulatedOutput = '';

async function listConnectors() {
    const input = { 
    };

    const command = new ListConnectorsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listConnectors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: Appflow: listConnectors", error);
    }
}

async function listFlows() {
    const input = { };

    const command = new ListFlowsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listFlows ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: Appflow, listFlows", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listConnectors,   
        listFlows,
         
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('appflow.txt')
    } 
    //main()
    module.exports = { main };