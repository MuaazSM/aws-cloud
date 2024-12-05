const { CleanRoomsMLClient, ListAudienceModelsCommand, ListConfiguredAudienceModelsCommand, ListTrainingDatasetsCommand } = require("@aws-sdk/client-cleanroomsml"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the CleanRoomsMLClient outside the function
const client = new CleanRoomsMLClient(config);

async function listAudienceModels() {
  const input = {};

  const command = new ListAudienceModelsCommand(input);

  try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- listAudienceModels ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CleanRoomsMLClient: ListAudienceModelsCommand", error);
  }
}

async function listConfiguredAudienceModels() {
  const input = {};

  const command = new ListConfiguredAudienceModelsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Configured Audience Models:", JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- listConfiguredAudienceModels ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CleanRoomsMLClient: ListConfiguredAudienceModelsCommand", error);
  }
}

async function listTrainingDatasets() {
  const input = {};

  const command = new ListTrainingDatasetsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Training Datasets:", JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- listTrainingDatasets ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CleanRoomsMLClient: ListTrainingDatasetsCommand", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAudienceModels,    
        listConfiguredAudienceModels,
        listTrainingDatasets,  
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('cleanroomsml.txt')
    }
//  main()

module.exports = { main };
