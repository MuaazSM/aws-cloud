const { MqClient, ListBrokersCommand, ListConfigurationsCommand } = require("@aws-sdk/client-mq"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new MqClient(config); // Create the MQ client using the config
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listBrokers() {
    const input = {};

    const command = new ListBrokersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Brokers:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listBrokers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MQ: ListBrokers", error);    }
}

async function listConfigurations() {
    const input = {};

    const command = new ListConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Configurations:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MQ: ListConfigurations", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listBrokers,    
        listConfigurations, 
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('mq.txt')
}

//  main(); 

module.exports = { main };
