const { AthenaClient, ListApplicationDPUSizesCommand, ListCapacityReservationsCommand, ListDataCatalogsCommand,
    ListEngineVersionsCommand, ListNamedQueriesCommand, ListQueryExecutionsCommand, ListWorkGroupsCommand, 
} = require("@aws-sdk/client-athena"); // CommonJS import
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AthenaClient(config);

async function listApplicationDPUSizes() {
const input = {

};

const command = new ListApplicationDPUSizesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listApplicationDPUSizes ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Athena: ListApplicationDPUSizes", error);
}
}

async function listCapacityReservations() {
const input = {

};

const command = new ListCapacityReservationsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listCapacityReservations ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Athena: ListCapacityReservations", error);
}
}

async function listDataCatalogs() {
const input = {
};

const command = new ListDataCatalogsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listDataCatalogs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Athena: ListDataCatalogs", error);
}
}

async function listEngineVersions() {
const input = {
};

const command = new ListEngineVersionsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listEngineVersions ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Athena: ListEngineVersions", error);
}
}

async function listNamedQueries() {
const input = {
};

const command = new ListNamedQueriesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listNamedQueries ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Athena: ListNamedQueries", error);
}
}

async function listQueryExecutions() {
const input = {
};

const command = new ListQueryExecutionsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listQueryExecutions ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Athena: ListQueryExecutions", error);
}
}

async function listWorkGroups() {
const input = {};

const command = new ListWorkGroupsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listWorkGroups ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Athena: ListWorkGroups", error);
}
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
const functionsToExecute = [
    listApplicationDPUSizes,    
    listCapacityReservations,
    listDataCatalogs, 
    listEngineVersions, 
    listNamedQueries,
    listQueryExecutions,
    listWorkGroups, 
]
for (const func of functionsToExecute) {
    try {
      await func(); // Await the function call
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
    //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`); // Commented out for now
    }
}
saveAllOutputToFile('athena.txt')
}

//  main() 

module.exports = { main };
