const { CodePipelineClient, ListActionTypesCommand } = require("@aws-sdk/client-codepipeline"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const client = new CodePipelineClient(config); // Create a client instance
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listActionTypes() {
    const input = {};

    const command = new ListActionTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Action Types:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listActionTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CodePipeline: ListActionTypes", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listActionTypes,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('codepipeline.txt')
    }
    //  main() 
    module.exports = { main };
