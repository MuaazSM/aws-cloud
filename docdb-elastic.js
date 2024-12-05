const { DocDBElasticClient, ListClustersCommand, ListPendingMaintenanceActionsCommand } = require("@aws-sdk/client-docdb-elastic"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new DocDBElasticClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listClusters() {
    const input = {};

    const command = new ListClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Clusters:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DocDBElastic: ListClusters", error);    
    }
}

async function listPendingMaintenanceActions() {
    const input = {};

    const command = new ListPendingMaintenanceActionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Pending Maintenance Actions:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listPendingMaintenanceActions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DocDBElastic: ListPendingMaintenanceActions", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listClusters,    
        listPendingMaintenanceActions, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('docdb-elastic.txt')
}

//  main() 

module.exports = { main };
