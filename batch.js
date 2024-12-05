// index.js
const { BatchClient, ListSchedulingPoliciesCommand } = require("@aws-sdk/client-batch");
const config = require('./awsConfig');
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';
const client = new BatchClient(config);

async function listSchedulingPolicies() {
    const input = {}; // No parameters are required; can be left empty or include optional params

    const command = new ListSchedulingPoliciesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listSchedulingPolicies ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: Batch: List Scheduling Policies", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listSchedulingPolicies,    
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        }
    }
    saveAllOutputToFile('batch.txt')
}

//  main(); 
module.exports = { main };
