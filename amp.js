const { AmpClient, GetDefaultScraperConfigurationCommand, ListScrapersCommand, ListWorkspacesCommand,   } = require("@aws-sdk/client-amp"); // CommonJS import
const logger = require('./logger')

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AmpClient(config);
const fs = require('fs'); 
let accumulatedOutput = '';

async function getDefaultScraperConfiguration() {
    const input = {}; // No input parameters are required for this command

    const command = new GetDefaultScraperConfigurationCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getDefaultScraperConfiguration ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: amp: get Default Scraper Configuration", error);
    }
}

async function listScrapers() {
    const input = {
    }

    const command = new ListScrapersCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listScrapers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: amp: list Scrapers", error);
    }
}

async function listWorkspaces() {
    const input = {
      
    };

    const command = new ListWorkspacesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listWorkspaces ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: amp: list Work spaces", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }


async function main() {
    const functionsToExecute = [
        getDefaultScraperConfiguration,
        listScrapers, 
        listWorkspaces,   
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('amp.txt')
    }
    main()
    module.exports = { main };