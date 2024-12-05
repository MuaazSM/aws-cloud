const { CodeDeployClient, ListApplicationsCommand, ListGitHubAccountTokenNamesCommand } = require("@aws-sdk/client-codedeploy"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the CodeDeployClient
const client = new CodeDeployClient(config);

async function listApplications() {
  const input = {};

  const command = new ListApplicationsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Applications:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listApplications ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeDeploy: ListApplications", error);
  }
}

async function listGitHubAccountTokenNames() {
    const input = {};
  
    const command = new ListGitHubAccountTokenNamesCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("GitHub Account Token Names:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listGitHubAccountTokenNames ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CodeDeploy: ListGitHubAccountTokenNames", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listApplications,    
        listGitHubAccountTokenNames, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('codedeploy.txt')
    }
    //  main() 
    module.exports = { main };
