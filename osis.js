const { OSISClient, ListPipelinesCommand } = require("@aws-sdk/client-osis"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new OSISClient(config); // Create the OSIS client using the config
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listPipelines() {
    const input = {}; // Empty input object to list all pipelines

    const command = new ListPipelinesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Pipelines:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listPipelines ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: OSIS: ListPipelines", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listPipelines,    
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('osis.txt')
}

//  main(); 

module.exports = { main };