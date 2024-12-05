const { CodeCatalystClient, ListAccessTokensCommand, ListSpacesCommand } = require("@aws-sdk/client-codecatalyst"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the CodeCatalystClient
const client = new CodeCatalystClient(config);

async function listAccessTokens() {
  const input = {}; // No parameters needed

  const command = new ListAccessTokensCommand(input);

  try {
    const response = await client.send(command);
    console.log("Access Tokens:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listAccessTokens ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeCatalyst: ListAccessTokens", error);
  }
}

async function listSpaces() {
    const input = {}; // No parameters needed
  
    const command = new ListSpacesCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("Spaces:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listSpaces ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CodeCatalyst: ListSpaces", error);
    }
  }

  function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAccessTokens,    
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
      saveAllOutputToFile('codecatalyst.txt')
    }
    //  main()
    module.exports = { main };
