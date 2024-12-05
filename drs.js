const { DrsClient, DescribeJobsCommand, DescribeRecoveryInstancesCommand, DescribeSourceServersCommand } = require("@aws-sdk/client-drs"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new DrsClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

// Function to describe jobs
async function describeJobs() {
    const input = {}; // Empty input parameter
    const command = new DescribeJobsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Jobs Description:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeJobs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DRS: DescribeJobs", error); // Logging specific error
    }
}

// Function to describe recovery instances
async function describeRecoveryInstances() {
    const input = {}; // Empty input parameter
    const command = new DescribeRecoveryInstancesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Recovery Instances Description:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeRecoveryInstances ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DRS: DescribeRecoveryInstances", error); // Logging specific error
    }
}

// Function to describe source servers
async function describeSourceServers() {
    const input = {}; // Empty input parameter
    const command = new DescribeSourceServersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Source Servers:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeSourceServers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DRS: DescribeSourceServers", error); // Logging specific error
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

// Main function that executes all tasks
async function main() {
    const functionsToExecute = [
        describeJobs,    
        describeRecoveryInstances, 
        describeSourceServers, 
    ];

    for (const func of functionsToExecute) {
        try {
            await func(); // Await the function call
        } catch (error) {
            console.error(`Error executing ${func.name}:`, error);
            // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('drs.txt')
}


// main();
module.exports = { main };

