const { CodeBuildClient, ListBuildBatchesCommand, ListBuildsCommand, ListCuratedEnvironmentImagesCommand, ListFleetsCommand,
  ListProjectsCommand, ListReportGroupsCommand, ListReportsCommand, ListSharedProjectsCommand, ListSharedReportGroupsCommand,
  ListSourceCredentialsCommand,  
} = require("@aws-sdk/client-codebuild"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

// Initialize the CodeBuildClient
const client = new CodeBuildClient(config);

async function listBuildBatches() {
const input = {};

const command = new ListBuildBatchesCommand(input);

try {
  const response = await client.send(command);
  console.log("Build Batches:", JSON.stringify(response, null, 2)); // Pretty print the response
  accumulatedOutput += `\n--- listBuildBatches ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
  logger.error("Error: CodeBuild: ListBuildBatches", error);
}
}

async function listBuilds() {
  const input = {};

  const command = new ListBuildsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Builds:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listBuilds ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeBuild: ListBuilds", error);
  }
}

async function listCuratedEnvironmentImages() {
  const input = {}; // No parameters required

  const command = new ListCuratedEnvironmentImagesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Curated Environment Images:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listCuratedEnvironmentImages ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeBuild: ListCuratedEnvironmentImages", error);
  }
}

async function listFleets() {
  const input = {}; // Empty input

  const command = new ListFleetsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Fleets:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listFleets ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeBuild: ListFleets", error);
  }
}

async function listProjects() {
  const input = {}; // Empty input

  const command = new ListProjectsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Projects:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listProjects ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeBuild: ListProjects", error);
  }
}

async function listReportGroups() {
  const input = {}; // Empty input

  const command = new ListReportGroupsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Report Groups:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listReportGroups ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeBuild: ListReportGroups", error);
  }
}

async function listReports() {
  const input = {}; // Empty input

  const command = new ListReportsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Reports:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listReports ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeBuild: ListReports", error);
  }
}

async function listSharedProjects() {
  const input = {}; // Empty input to fetch all shared projects

  const command = new ListSharedProjectsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Shared Projects:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listSharedProjects ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeBuild: ListSharedProjects", error);
  }
}

async function listSharedReportGroups() {
  const input = {}; // Empty input to fetch all shared report groups

  const command = new ListSharedReportGroupsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Shared Report Groups:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listSharedReportGroups ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeBuild: ListSharedReportGroups", error);
  }
}

async function listSourceCredentials() {
  const input = {}; // Empty input to fetch all source credentials

  const command = new ListSourceCredentialsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Source Credentials:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listSourceCredentials ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeBuild: ListSourceCredentials", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
  const functionsToExecute = [
      listBuildBatches,    
      listBuilds, 
      listCuratedEnvironmentImages, 
      listFleets, 
      listProjects, 
      listReportGroups, 
      listReports, 
      listSharedProjects, 
      listSharedReportGroups,
      listSourceCredentials,  
  ]
  for (const func of functionsToExecute) {
      try {
        await func(); // Await the function call
      } catch (error) {
        console.error(`Error executing ${func.name}:`, error);
      //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
      }
    }
    saveAllOutputToFile('codebuild.txt')
  }
  //  main()
  module.exports = { main };
