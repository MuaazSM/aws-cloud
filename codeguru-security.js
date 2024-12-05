const { CodeGuruSecurityClient, GetAccountConfigurationCommand, ListScansCommand } = require("@aws-sdk/client-codeguru-security"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const client = new CodeGuruSecurityClient(config); // Create a client instance
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function getAccountConfiguration() {
    const input = {}; // No parameters needed for this command
    const command = new GetAccountConfigurationCommand(input);

    try {
        const response = await client.send(command);
        console.log("Account Configuration:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- getAccountConfiguration ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: CodeGuruSecurity: GetAccountConfiguration", error);
    }
}

async function listScans() {
    const input = {}; 
    const command = new ListScansCommand(input);

    try {
        const response = await client.send(command);
        console.log("List of Scans:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listScans ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: CodeGuruSecurity: ListScans", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        getAccountConfiguration,    
        listScans, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('codeguru-security.txt')
    }
    //  main() 
    module.exports = { main };
