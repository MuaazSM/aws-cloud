const { ChimeClient, GetGlobalSettingsCommand, GetPhoneNumberSettingsCommand } = require("@aws-sdk/client-chime");
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the ChimeClient outside the function
const client = new ChimeClient(config);

async function getGlobalSettings() {
  const input = {}; // No parameters are required for this command

  const command = new GetGlobalSettingsCommand(input);

  try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- getGlobalSettings ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ChimeClient: GetGlobalSettingsCommand", error);
  }
}

async function getPhoneNumberSettings() {
    const input = {}; // No parameters are required for this command
  
    const command = new GetPhoneNumberSettingsCommand(input);
  
    try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2))
      accumulatedOutput += `\n--- getPhoneNumberSettings ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: ChimeClient: GetPhoneNumberSettingsCommand", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        getGlobalSettings,    
        getPhoneNumberSettings, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('chime.txt')
    }
// main()

module.exports = { main };
