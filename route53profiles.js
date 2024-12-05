const { Route53ProfilesClient, ListProfilesCommand } = require("@aws-sdk/client-route53profiles"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new Route53ProfilesClient(config); // Create the client using the AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listProfiles() {
    const input = {};

    const command = new ListProfilesCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Profiles:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listProfiles ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: Route53Profiles: listProfiles", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listProfiles,    

    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('route53profiles.txt')
    }
// main()

module.exports = { main };
