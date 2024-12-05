const { ElasticTranscoderClient, ListPipelinesCommand, ListPresetsCommand } = require("@aws-sdk/client-elastic-transcoder"); // CommonJS import
const config = require('./awsConfig');
const client = new ElasticTranscoderClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listPipelines() {
    const input = {};

    const command = new ListPipelinesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Pipelines:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listPipelines ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ElasticTranscoder: List Pipelines", error); // Updated error log format
    }
}

async function listPresets() {
    const input = {};

    const command = new ListPresetsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Presets:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listPresets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ElasticTranscoder: List Presets", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listPipelines,    
        listPresets,  
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('elastic-transcoder.txt')
}

//  main() 

module.exports = { main };
