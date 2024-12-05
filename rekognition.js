const { RekognitionClient, ListCollectionsCommand } = require("@aws-sdk/client-rekognition"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new RekognitionClient(config); // Create the Rekognition client using the config
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listCollections() {
    const input = {}; // Empty input to retrieve all collections

    const command = new ListCollectionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Collections:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCollections ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: Rekognition: listCollections", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listCollections,    

    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('rekognition.txt')
    }
// main()

module.exports = { main };
