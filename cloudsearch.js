const { CloudSearchClient, ListDomainNamesCommand } = require("@aws-sdk/client-cloudsearch"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

// Initialize the CloudSearchClient outside the function
const client = new CloudSearchClient(config);

async function listDomainNames() {
  const input = {}; // Keep the input empty since no parameters are necessary

  const command = new ListDomainNamesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Domain Names:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listDomainNames ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudSearch: List Domain Names", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listDomainNames,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('cloudsearch.txt')
    }
    // main()
    module.exports = { main };
