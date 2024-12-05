const { CleanRoomsClient, ListCollaborationsCommand, ListConfiguredTablesCommand, ListMembershipsCommand } = require("@aws-sdk/client-cleanrooms"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the CleanRoomsClient outside the function
const client = new CleanRoomsClient(config);

async function listCollaborations() {
  const input = {};

  const command = new ListCollaborationsCommand(input);

  try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2))
    accumulatedOutput += `\n--- listCollaborations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CleanRoomsClient: ListCollaborationsCommand", error);
  }
}

async function listConfiguredTables() {
    const input = {};

    const command = new ListConfiguredTablesCommand(input);

    try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2));
      accumulatedOutput += `\n--- listConfiguredTables ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CleanRoomsClient: ListConfiguredTablesCommand", error);
    }
}

async function listMemberships() {
    const input = {};

    const command = new ListMembershipsCommand(input);

    try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2));
      accumulatedOutput += `\n--- listMemberships ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CleanRoomsClient: ListMembershipsCommand", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listCollaborations,    
        listConfiguredTables, 
        listMemberships, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('cleanrooms.txt')
    }
// main()

module.exports = { main };
