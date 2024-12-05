const { Cloud9Client, ListEnvironmentsCommand } = require("@aws-sdk/client-cloud9"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the Cloud9Client outside the function
const client = new Cloud9Client(config);

async function listEnvironments() {
  const input = {};

  const command = new ListEnvironmentsCommand(input);

  try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2))
    accumulatedOutput += `\n--- listEnvironments ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Cloud9Client: ListEnvironmentsCommand", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listEnvironments,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('cloud9.txt')
    }
//  main()

module.exports = { main };
