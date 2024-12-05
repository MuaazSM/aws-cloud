const { GlueClient, GetSecurityConfigurationsCommand, ListBlueprintsCommand, ListColumnStatisticsTaskRunsCommand,
    ListCrawlersCommand, ListCustomEntityTypesCommand, ListRegistriesCommand, ListUsageProfilesCommand, ListWorkflowsCommand
} = require("@aws-sdk/client-glue"); // CommonJS import
const config = require('./awsConfig');
const client = new GlueClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function getSecurityConfigurations() {
const input = {};

const command = new GetSecurityConfigurationsCommand(input);

try {
    const response = await client.send(command);
    console.log("Security Configurations:", JSON.stringify(response, null, 2)); // Log the response
    accumulatedOutput += `\n--- getSecurityConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
    logger.error("Error: Glue: Get Security Configurations", error); // Updated error log format
}
}

async function listBlueprints() {
const input = {};

const command = new ListBlueprintsCommand(input);

try {
    const response = await client.send(command);
    console.log("Blueprints:", JSON.stringify(response, null, 2)); // Log the response
    accumulatedOutput += `\n--- listBlueprints ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
    logger.error("Error: Glue: List Blueprints", error); // Updated error log format
}
}

async function listColumnStatisticsTaskRuns() {
const input = {};

const command = new ListColumnStatisticsTaskRunsCommand(input);

try {
    const response = await client.send(command);
    console.log("Column Statistics Task Runs:", JSON.stringify(response, null, 2)); // Log the response
    accumulatedOutput += `\n--- listColumnStatisticsTaskRuns ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
    logger.error("Error: Glue: List Column Statistics Task Runs", error); // Updated error log format
}
}

async function listCrawlers() {
const input = {};

const command = new ListCrawlersCommand(input);

try {
    const response = await client.send(command);
    console.log("Crawlers:", JSON.stringify(response, null, 2)); // Log the response
    accumulatedOutput += `\n--- listCrawlers ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
    logger.error("Error: Glue: List Crawlers", error); // Updated error log format
}
}

async function listCustomEntityTypes() {
const input = {};

const command = new ListCustomEntityTypesCommand(input);

try {
    const response = await client.send(command);
    console.log("Custom Entity Types:", JSON.stringify(response, null, 2)); // Log the response
    accumulatedOutput += `\n--- listCustomEntityTypes ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
    logger.error("Error: Glue: List Custom Entity Types", error); // Updated error log format
}
}

async function listRegistries() {
const input = {};

const command = new ListRegistriesCommand(input);

try {
    const response = await client.send(command);
    console.log("Registries:", JSON.stringify(response, null, 2)); // Log the response
    accumulatedOutput += `\n--- listRegistries ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
    logger.error("Error: Glue: List Registries", error); // Updated error log format
}
}

async function listUsageProfiles() {
const input = {};

const command = new ListUsageProfilesCommand(input);

try {
    const response = await client.send(command);
    console.log("Usage Profiles:", JSON.stringify(response, null, 2)); // Log the response
    accumulatedOutput += `\n--- listUsageProfiles ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
    logger.error("Error: Glue: List Usage Profiles", error); // Updated error log format
}
}

async function listWorkflows() {
const input = {};

const command = new ListWorkflowsCommand(input);

try {
    const response = await client.send(command);
    console.log("Workflows:", JSON.stringify(response, null, 2)); // Log the response
    accumulatedOutput += `\n--- listWorkflows ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
    logger.error("Error: Glue: List Workflows", error); // Updated error log format
}
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
const functionsToExecute = [
    getSecurityConfigurations,    
    listBlueprints, 
    listColumnStatisticsTaskRuns, 
    listCrawlers, 
    listCustomEntityTypes, 
    listRegistries, 
    listUsageProfiles,
    listWorkflows,  
]
for (const func of functionsToExecute) {
    try {
      await func(); // Await the function call
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
      // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
    }
}
saveAllOutputToFile('glue.txt')
}

//  main() 

module.exports = { main };
