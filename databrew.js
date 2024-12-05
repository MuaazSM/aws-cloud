const { DataBrewClient, ListDatasetsCommand, ListProjectsCommand, ListJobsCommand, ListRecipesCommand, ListRulesetsCommand, ListSchedulesCommand } = require("@aws-sdk/client-databrew"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

const client = new DataBrewClient(config);

async function listDatasets() {
    const input = {}; // Empty input parameter

    const command = new ListDatasetsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Datasets:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listDatasets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataBrew: ListDatasets", error);    
    }
}

async function listProjects() {
    const input = {}; // Empty input parameter

    const command = new ListProjectsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Projects:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listProjects ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataBrew: ListProjects", error);    
    }
}

async function listJobs() {
    const input = {}; // Empty input parameter

    const command = new ListJobsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listJobs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataBrew: ListJobs", error);    
    }
}

async function listRecipes() {
    const input = {}; // Empty input parameter

    const command = new ListRecipesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Recipes:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listRecipes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataBrew: ListRecipes", error);    
    }
}

async function listRulesets() {
    const input = {}; // Empty input parameter

    const command = new ListRulesetsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Rulesets:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listRulesets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataBrew: ListRulesets", error);    
    }
}

async function listSchedules() {
    const input = {}; // Empty input parameter

    const command = new ListSchedulesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Schedules:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listSchedules ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DataBrew: ListSchedules", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listDatasets,    
        listProjects, 
        listJobs, 
        listRecipes, 
        listRulesets, 
        listSchedules, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('databrew.txt')
}

//  main()

module.exports = { main };
