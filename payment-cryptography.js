const { PaymentCryptographyClient, ListAliasesCommand, ListKeysCommand } = require("@aws-sdk/client-payment-cryptography"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new PaymentCryptographyClient(config); // Create the Payment Cryptography client using the config
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listAliases() {
    const input = {}; // Empty input object to list all aliases

    const command = new ListAliasesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Aliases:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAliases ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: PaymentCryptography: ListAliases", error);    }
}

async function listKeys() {
    const input = {}; // Empty input object to list all keys

    const command = new ListKeysCommand(input);

    try {
        const response = await client.send(command);
        console.log("Keys:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listKeys ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: PaymentCryptography: ListKeys", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAliases,    
        listKeys, 
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('payment-cryptography.txt')
}

//  main(); 

module.exports = { main };
