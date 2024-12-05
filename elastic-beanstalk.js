const { ElasticBeanstalkClient, DescribeAccountAttributesCommand, ListAvailableSolutionStacksCommand } = require("@aws-sdk/client-elastic-beanstalk"); // CommonJS import
const config = require('./awsConfig');
const client = new ElasticBeanstalkClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeAccountAttributes() {
    const input = {}; // No parameters needed for this command

    const command = new DescribeAccountAttributesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Account Attributes:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeAccountAttributes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ElasticBeanstalk: Describe Account Attributes", error); // Updated error log format
    }
}

async function listAvailableSolutionStacks() {
    const input = {}; // No input parameters needed for this command
    const command = new ListAvailableSolutionStacksCommand(input);

    try {
        const response = await client.send(command);
        console.log("Available Solution Stacks:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listAvailableSolutionStacks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ElasticBeanstalk: List Available Solution Stacks", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        describeAccountAttributes,    
        listAvailableSolutionStacks, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('elastic-beanstalk.txt')

}

//  main() 

module.exports = { main };
