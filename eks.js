const { EKSClient, ListAccessPoliciesCommand, ListClustersCommand } = require("@aws-sdk/client-eks"); // CommonJS import
const config = require('./awsConfig');
const client = new EKSClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listAccessPolicies() {
    const input = {};

    const command = new ListAccessPoliciesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Access Policies List:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listAccessPolicies ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: EKS: List Access Policies", error); // Updated error log format
    }
}

async function listClusters() {
    const input = {};

    const command = new ListClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Clusters List:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: EKS: List Clusters", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAccessPolicies,    
        listClusters, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('eks.txt')
}

//  main() 

module.exports = { main };
  