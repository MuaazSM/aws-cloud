const { KafkaConnectClient, ListConnectorsCommand, ListCustomPluginsCommand } = require("@aws-sdk/client-kafkaconnect"); // CommonJS import
const config = require('./awsConfig');
const client = new KafkaConnectClient(config); // Initialize the Kafka Connect client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listConnectors() {
    const input = {}; 

    const command = new ListConnectorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Connectors List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConnectors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Kafka Connect: List Connectors", error);    
    }
}

async function listCustomPlugins() {
    const input = {}; 

    const command = new ListCustomPluginsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Custom Plugins List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCustomPlugins ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Kafka Connect: List Custom Plugins", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listConnectors,    
        listCustomPlugins, 
    ];

    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('kafkaconnect.txt')
}

//  main();

module.exports = { main };
