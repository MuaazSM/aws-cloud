const { ArtifactClient, GetAccountSettingsCommand, ListReportsCommand,  } = require("@aws-sdk/client-artifact"); // CommonJS import

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new ArtifactClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function getAccountSettings() {
    const input = {}; // No parameters required for this command

    const command = new GetAccountSettingsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getAccountSettings ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: Artifact: GetAccountSettings", error);
    }
}

async function listReports() {
    const input = {
       
    };

    const command = new ListReportsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listReports ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: Artifact: ListReports", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        getAccountSettings,    
        listReports, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`); // Commented out for now
        }
    }
    saveAllOutputToFile('artifact.txt')
}

//  main() 

module.exports = { main };
