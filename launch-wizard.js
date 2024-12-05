const { LaunchWizardClient, ListDeploymentsCommand } = require("@aws-sdk/client-launch-wizard"); // CommonJS import
const config = require('./awsConfig');
const client = new LaunchWizardClient(config); // Initialize the Launch Wizard client
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listDeployments() {
    const input = {}; 

    const command = new ListDeploymentsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Deployments List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDeployments ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: LaunchWizard: listDeployments", error);    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listDeployments,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('launch-wizard.txt')
    }
    // main()
module.exports = { main }