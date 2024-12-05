const { Macie2Client, ListAllowListsCommand, ListAutomatedDiscoveryAccountsCommand, ListCustomDataIdentifiersCommand,
    ListFindingsFiltersCommand, ListInvitationsCommand, ListSensitivityInspectionTemplatesCommand, 
} = require("@aws-sdk/client-macie2"); // CommonJS import

const config = require('./awsConfig');
const client = new Macie2Client(config); // Initialize the Macie2 client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listAllowLists() {
    const input = {}; 
    const command = new ListAllowListsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Allow Lists:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAllowLists ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Macie2: ListAllowLists", error); // Updated error logging
    }
}

async function listAutomatedDiscoveryAccounts() {
    const input = {}; 
    const command = new ListAutomatedDiscoveryAccountsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Automated Discovery Accounts:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAutomatedDiscoveryAccounts ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Macie2: ListAutomatedDiscoveryAccounts", error); // Updated error logging
    }
}

async function listCustomDataIdentifiers() {
    const input = {}; 
    const command = new ListCustomDataIdentifiersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Custom Data Identifiers:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCustomDataIdentifiers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Macie2: ListCustomDataIdentifiers", error); // Updated error logging
    }
}

async function listFindingsFilters() {
    const input = {}; 
    const command = new ListFindingsFiltersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Findings Filters:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listFindingsFilters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Macie2: ListFindingsFilters", error); // Updated error logging
    }
}

async function listInvitations() {
    const input = {}; 
    const command = new ListInvitationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Invitations:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listInvitations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Macie2: ListInvitations", error); // Updated error logging
    }
}

async function listSensitivityInspectionTemplates() {
    const input = {}; 
    const command = new ListSensitivityInspectionTemplatesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Sensitivity Inspection Templates:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listSensitivityInspectionTemplates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Macie2: ListSensitivityInspectionTemplates", error); // Updated error logging
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAllowLists,    
        listAutomatedDiscoveryAccounts, 
        listCustomDataIdentifiers, 
        listFindingsFilters, 
        listInvitations, 
        listSensitivityInspectionTemplates, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('macie2.txt')
}

//  main() 

module.exports = { main };
