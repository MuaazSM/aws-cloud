const { AppIntegrationsClient, ListApplicationsCommand, ListDataIntegrationsCommand, ListEventIntegrationsCommand,  } = require("@aws-sdk/client-appintegrations"); // CommonJS import
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AppIntegrationsClient(config);

async function listApplications() {
    const input = {};

    const command = new ListApplicationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listApplications ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppIntegrations: listApplications", error);
    }
}

async function listDataIntegrations() {
    const input = { // ListDataIntegrationsRequest
    
    };

    const command = new ListDataIntegrationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listDataIntegrations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppIntegrations: listDataIntegrations", error);
    }
}

async function listEventIntegrations() {
    const input = { 
    };

    const command = new ListEventIntegrationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listEventIntegrations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppIntegrations: listEventIntegrations", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        listApplications,    
        listDataIntegrations,
        listEventIntegrations, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('appintegrations.txt')
    }
    // main()
    module.exports = { main };