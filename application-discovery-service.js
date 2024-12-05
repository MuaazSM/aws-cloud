const { ApplicationDiscoveryServiceClient, DescribeAgentsCommand, DescribeContinuousExportsCommand, DescribeExportConfigurationsCommand,
    DescribeExportTasksCommand, DescribeImportTasksCommand, DescribeTagsCommand, 
  } = require("@aws-sdk/client-application-discovery-service"); // CommonJS import
  const logger = require('./logger')
  const fs = require('fs'); 
  let accumulatedOutput = '';

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new ApplicationDiscoveryServiceClient(config);

async function describeAgents() {
    const input = { // DescribeAgentsRequest
        
    };

    const command = new DescribeAgentsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeAgents ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationDiscoveryService: describeAgents", error);
    }
}

async function describeContinuousExports() {
    const input = { 
    };

    const command = new DescribeContinuousExportsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeContinuousExports ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationDiscoveryService: describeContinuousExports", error);
    }
}

async function describeExportConfigurations() {
    const input = {
    };

    const command = new DescribeExportConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeExportConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationDiscoveryService: describeExportConfigurations", error);
    }
}

async function describeExportTasks() {
    const input = {
    };

    const command = new DescribeExportTasksCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeExportTasks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationDiscoveryService: describeExportTasks", error);
    }
}

async function describeImportTasks() {
    const input = { 
    };

    const command = new DescribeImportTasksCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeImportTasks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationDiscoveryService: describeImportTasks", error);
    }
}
async function describeTags() {
    const input = { 
    };

    const command = new DescribeTagsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeTags ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationDiscoveryService: describeTags", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        describeAgents,   
        describeContinuousExports,
        describeExportConfigurations,  
        describeExportTasks, 
        describeImportTasks, 
        describeTags, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('application-discovery-service.txt')
    }
    // main()
    module.exports = { main };