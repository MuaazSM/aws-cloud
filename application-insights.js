const { ApplicationInsightsClient, ListApplicationsCommand, ListConfigurationHistoryCommand, ListProblemsCommand, 

  } = require("@aws-sdk/client-application-insights"); // CommonJS import
  const logger = require('./logger')
  const fs = require('fs'); 
  let accumulatedOutput = '';

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new ApplicationInsightsClient(config);

async function listApplications() {
    const input = { 
    };

    const command = new ListApplicationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listApplications ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationInsights: listApplications", error);
    }
}

async function listConfigurationHistory() {
    const input = {}

    const command = new ListConfigurationHistoryCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listConfigurationHistory ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationInsights: listConfigurationHistory", error);
    }
}


async function listProblems() {
    const input = {
    };

    const command = new ListProblemsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listProblems ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationInsights: listProblems", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listApplications,    
        listConfigurationHistory, 
        listProblems, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        }
      }
      saveAllOutputToFile('application-insights.txt')
    }
    // main()
    module.exports = { main };