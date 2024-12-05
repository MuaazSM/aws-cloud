const { OmicsClient, ListAnnotationStoresCommand, ListRunGroupsCommand } = require("@aws-sdk/client-omics"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new OmicsClient(config); // Create the Omics client using the config
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listAnnotationStores() {
    const input = {};

    const command = new ListAnnotationStoresCommand(input);

    try {
        const response = await client.send(command);
        console.log("Annotation Stores:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAnnotationStores ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Omics: ListAnnotationStores", error);    }
}

async function listRunGroups() {
    const input = {}; // Empty input object to list all run groups

    const command = new ListRunGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Run Groups:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listRunGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Omics: ListRunGroups", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAnnotationStores,    
        listRunGroups, 
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }

    saveAllOutputToFile('omics.txt')
}

//  main(); 

module.exports = { main };
