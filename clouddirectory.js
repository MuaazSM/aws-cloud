const { CloudDirectoryClient, ListDevelopmentSchemaArnsCommand, ListDirectoriesCommand, ListManagedSchemaArnsCommand, ListPublishedSchemaArnsCommand } = require("@aws-sdk/client-clouddirectory"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the CloudDirectoryClient outside the function
const client = new CloudDirectoryClient(config);

async function listDevelopmentSchemaArns() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListDevelopmentSchemaArnsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Development Schema ARNs:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listDevelopmentSchemaArns ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudDirectoryClient: ListDevelopmentSchemaArnsCommand", error);
  }
}

async function listDirectories() {
    const input = {}; // Keep the input empty if parameters are not necessary
  
    const command = new ListDirectoriesCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("Directories:", JSON.stringify(response, null, 2)); // 
      accumulatedOutput += `\n--- listDirectories ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CloudDirectoryClient: ListDirectoriesCommand", error);
    }
}

async function listManagedSchemaArns() {
    const input = {}; // Keep the input empty if parameters are not necessary
  
    const command = new ListManagedSchemaArnsCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("Managed Schema ARNs:", JSON.stringify(response, null, 2)); // 
      accumulatedOutput += `\n--- listManagedSchemaArns ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CloudDirectoryClient: ListManagedSchemaArnsCommand", error);
    }
}

async function listPublishedSchemaArns() {
    const input = {}; // Keep the input empty if parameters are not necessary
  
    const command = new ListPublishedSchemaArnsCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("Published Schema ARNs:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listPublishedSchemaArns ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CloudDirectoryClient: ListPublishedSchemaArnsCommand", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listDevelopmentSchemaArns,    
        listDirectories,
        listManagedSchemaArns,
        listPublishedSchemaArns,  
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('clouddirectory.txt')
    }
//  main()

module.exports = { main };
