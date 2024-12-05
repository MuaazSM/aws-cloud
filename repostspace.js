const { RepostspaceClient, ListSpacesCommand } = require("@aws-sdk/client-repostspace"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new RepostspaceClient(config); // Create the Repostspace client using the config
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listSpaces() {
    const input = {}; // Empty input to retrieve all spaces

    const command = new ListSpacesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Spaces:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listSpaces ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: Repostspace: listSpaces", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listSpaces,    

    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('repostspace.txt')
    }
// main()

module.exports = { main };
