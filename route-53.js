const { Route53Client, ListCidrCollectionsCommand, ListHealthChecksCommand } = require("@aws-sdk/client-route-53"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new Route53Client(config); // Create the Route53 client using the config
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listCidrCollections() {
    const input = {}; // Empty input to retrieve all CIDR collections

    const command = new ListCidrCollectionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("CIDR Collections:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCidrCollections ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: Route53: listCidrCollections", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listCidrCollections,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('route-53.txt')
    }
    main()