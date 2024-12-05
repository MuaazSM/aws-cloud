const { OrganizationsClient, DescribeOrganizationCommand, ListAccountsCommand, ListRootsCommand } = require("@aws-sdk/client-organizations"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new OrganizationsClient(config); // Create the Organizations client using the config
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeOrganization() {
    const input = {}; // No input parameters are needed for this command

    const command = new DescribeOrganizationCommand(input);

    try {
        const response = await client.send(command);
        console.log("Organization Details:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeOrganization ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Organizations: DescribeOrganization", error);    }
}

async function listAccounts() {
    const input = {}; // Empty input object to list all accounts

    const command = new ListAccountsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Accounts:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAccounts ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Organizations: ListAccounts", error);    }
}

async function listRoots() {
    const input = {}; // Empty input object to list all roots

    const command = new ListRootsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Roots:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listRoots ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Organizations: ListRoots", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeOrganization,    
        listAccounts, 
        listRoots, 
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('organization.txt')
}

//  main(); 

module.exports = { main };
