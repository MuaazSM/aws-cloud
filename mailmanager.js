const { MailManagerClient, ListAddonInstancesCommand, ListAddonSubscriptionsCommand, ListArchivesCommand, ListRuleSetsCommand } = require("@aws-sdk/client-mailmanager"); // CommonJS import
const config = require('./awsConfig');
const client = new MailManagerClient(config); // Initialize the MailManager client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listAddonInstances() {
    const input = {}; 
    const command = new ListAddonInstancesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Addon Instances:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAddonInstances ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MailManager: ListAddonInstances", error); // Updated error logging
    }
}

async function listAddonSubscriptions() {
    const input = {}; 
    const command = new ListAddonSubscriptionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Addon Subscriptions:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAddonSubscriptions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MailManager: ListAddonSubscriptions", error); // Updated error logging
    }
}

async function listArchives() {
    const input = {}; 
    const command = new ListArchivesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Archives:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listArchives ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MailManager: ListArchives", error); // Updated error logging
    }
}

async function listRuleSets() {
    const input = {}; 
    const command = new ListRuleSetsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Rule Sets:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listRuleSets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MailManager: ListRuleSets", error); // Updated error logging
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAddonInstances,    
        listAddonSubscriptions, 
        listArchives,
        listRuleSets,  
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('mailmanager.txt')
}

//  main() 

module.exports = { main };
