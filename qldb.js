const { QLDBClient, ListJournalS3ExportsCommand, ListLedgersCommand } = require("@aws-sdk/client-qldb"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new QLDBClient(config); // Create the QLDB client using the config
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listJournalS3Exports() {
    const input = {};

    const command = new ListJournalS3ExportsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Journal S3 Exports:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listJournalS3Exports ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: QLDB: listJournalS3Exports", error);    
    }
}

async function listLedgers() {
    const input = {}; // Empty input object to list all ledgers

    const command = new ListLedgersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Ledgers:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listLedgers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: QLDB: listLedgers", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listJournalS3Exports,    
        listLedgers, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('qldb.txt')
    }
// main()

module.exports = { main };
