const { MWAAClient, ListEnvironmentsCommand } = require("@aws-sdk/client-mwaa"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new MWAAClient(config); // Create the MWAA client using the config
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listEnvironments() {
    const input = {};

    const command = new ListEnvironmentsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Environments:", JSON.stringify(response, null, 2)); // Log the response        
        accumulatedOutput += `\n--- listEnvironments ---\n${JSON.stringify(response, null, 2)}\n`;
    } catch (error) {
        logger.error("Error: MWAA: ListEnvironments", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listEnvironments,    
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('mwaa.txt')
}

//  main(); 

module.exports = { main };
