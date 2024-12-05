const { Route53RecoveryReadinessClient, ListCellsCommand, ListCrossAccountAuthorizationsCommand, ListReadinessChecksCommand,
  ListRecoveryGroupsCommand, ListResourceSetsCommand, 
 } = require("@aws-sdk/client-route53-recovery-readiness"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new Route53RecoveryReadinessClient(config); // Create the client using the configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listCells() {
    const input = {}; // Empty input, no pagination or limits

    const command = new ListCellsCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Cells:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCells ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: Route53RecoveryReadiness: listCells", error);    
    }
}

async function listCrossAccountAuthorizations() {
  const input = {}; // Empty input, no pagination or limits

  const command = new ListCrossAccountAuthorizationsCommand(input);

  try {
      const response = await client.send(command); // Send the command and get the response
      console.log("Cross Account Authorizations:", JSON.stringify(response, null, 2)); // Log the response
      accumulatedOutput += `\n--- listCrossAccountAuthorizations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Route53RecoveryReadiness: listCrossAccountAuthorizations", error);  
  }
}

async function listReadinessChecks() {
  const input = {}; // Empty input if no pagination or result limits are required

  const command = new ListReadinessChecksCommand(input);

  try {
      const response = await client.send(command); // Send the command and get the response
      console.log("Readiness Checks:", JSON.stringify(response, null, 2)); // Log the response
      accumulatedOutput += `\n--- listReadinessChecks ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Route53RecoveryReadiness: listReadinessChecks", error);  
  }
}

async function listRecoveryGroups() {
  const input = {}; // Empty input if no pagination or result limits are required

  const command = new ListRecoveryGroupsCommand(input);

  try {
      const response = await client.send(command); // Send the command and get the response
      console.log("Recovery Groups:", JSON.stringify(response, null, 2)); // Log the response
      accumulatedOutput += `\n--- listRecoveryGroups ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Route53RecoveryReadiness: listRecoveryGroups", error);  
  }
}

async function listResourceSets() {
  const input = {}; // Empty input if no pagination or result limits are required

  const command = new ListResourceSetsCommand(input);

  try {
      const response = await client.send(command); // Send the command and get the response
      console.log("Resource Sets:", JSON.stringify(response, null, 2)); // Log the response
      accumulatedOutput += `\n--- listResourceSets ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Route53RecoveryReadiness: listResourceSets", error);  
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listCells,    
        listCrossAccountAuthorizations, 
        listReadinessChecks,
        listRecoveryGroups,  
        listResourceSets, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('route53-recovery-readiness.txt')
    }
// main()

module.exports = { main };
