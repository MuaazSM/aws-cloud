const { VerifiedPermissionsClient, ListPolicyStoresCommand } = require("@aws-sdk/client-verifiedpermissions"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file (AWS credentials)
const client = new VerifiedPermissionsClient(config); // Create the client using the configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listPolicyStores() {
    const input = {};

    const command = new ListPolicyStoresCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Policy Stores:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listPolicyStores ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: VerifiedPermissions: listPolicyStores", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listPolicyStores,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('verifiedpermissions.txt')
    }
    main()
    module.exports = { main };