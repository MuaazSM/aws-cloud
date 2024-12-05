const { ConnectCasesClient, ListDomainsCommand } = require("@aws-sdk/client-connectcases"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new ConnectCasesClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listDomains(nextToken = null, maxResults = null) {
    const input = {};

    const command = new ListDomainsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Domains:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listDomains ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ConnectCases: ListDomains", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listDomains,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('connectcases.txt')
    }
  //  main()

module.exports = { main };
