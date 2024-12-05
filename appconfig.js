const { AppConfigClient, GetAccountSettingsCommand, ListApplicationsCommand, ListDeploymentStrategiesCommand, ListExtensionsCommand, 

     } = require("@aws-sdk/client-appconfig"); // CommonJS import
     const logger = require('./logger')
     const fs = require('fs'); 
     let accumulatedOutput = '';
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AppConfigClient(config);

async function getAccountSettings() {
    const input = {}; // No input parameters needed for this command

    const command = new GetAccountSettingsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getAccountSettings ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppConfig: getAccountSettings", error);
    }
}

async function listApplications() {
    const input = {
       
    };

    const command = new ListApplicationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listApplications ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppConfig: listApplications", error);
    }
}

async function listDeploymentStrategies() {
    const input = {
       
    };

    const command = new ListDeploymentStrategiesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listDeploymentStrategies ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppConfig: listDeploymentStrategies", error);
    }
}

async function listExtensions() {
    const input = {
      
    };

    const command = new ListExtensionsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listExtensions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppConfig: listExtensions", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        getAccountSettings, 
        listApplications, 
        listDeploymentStrategies,    
        listExtensions,
        
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('appconfig.txt')}
    //main()
    module.exports = { main };