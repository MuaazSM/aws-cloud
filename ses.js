const { SESClient, ListConfigurationSetsCommand, ListCustomVerificationEmailTemplatesCommand, ListIdentitiesCommand, ListReceiptFiltersCommand, ListTemplatesCommand } = require("@aws-sdk/client-ses"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file (AWS credentials)
const client = new SESClient(config); // Create the client using the configuration
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listConfigurationSets() {
    const input = {};

    const command = new ListConfigurationSetsCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Configuration Sets:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConfigurationSets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: SES: listConfigurationSets", error);    
    }
}

async function listCustomVerificationEmailTemplates() {
    const input = {};

    const command = new ListCustomVerificationEmailTemplatesCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Custom Verification Email Templates:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCustomVerificationEmailTemplates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: SES: listCustomVerificationEmailTemplates", error);    
    }
}

async function listIdentities() {
    const input = {};

    const command = new ListIdentitiesCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Identities:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listIdentities ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: SES: listIdentities", error);    
    }
}

async function listReceiptFilters() {
    const input = {}; // Leave input parameter empty to list all receipt filters

    const command = new ListReceiptFiltersCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Receipt Filters:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listReceiptFilters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: SES: listReceiptFilters", error);    
    }
}

async function listTemplates() {
    const input = {};

    const command = new ListTemplatesCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Templates:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listTemplates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: SES: listTemplates", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        listConfigurationSets,    
        listCustomVerificationEmailTemplates, 
        listIdentities, 
        listReceiptFilters, 
        listTemplates, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('ses.txt')

    }
// main()

module.exports = { main };
