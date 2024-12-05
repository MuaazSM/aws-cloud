const { Route53DomainsClient, ListDomainsCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new Route53DomainsClient(config); // Create the Route53Domains client using the config
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listDomains() {
    const input = {}; // Empty input to list all domains

    const command = new ListDomainsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Domains:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDomains ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: Route53Domains: listDomains", error);    
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
      saveAllOutputToFile('route-53-domains.txt')
    }
// main()

module.exports = { main };
