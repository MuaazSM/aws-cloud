const { ManagedBlockchainClient, ListAccessorsCommand, ListInvitationsCommand } = require("@aws-sdk/client-managedblockchain"); // CommonJS import
const config = require('./awsConfig');
const client = new ManagedBlockchainClient(config); // Initialize the Managed Blockchain client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listAccessors() {
    const input = {}; 
    const command = new ListAccessorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Accessors:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAccessors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ManagedBlockchain: ListAccessors", error); // Updated error logging
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
        logger.error("Error: ManagedBlockchain: ListInvitations", error); // Updated error logging
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAccessors,    
        listInvitations, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('managedblockchain.txt')
}

//  main() 

module.exports = { main };
