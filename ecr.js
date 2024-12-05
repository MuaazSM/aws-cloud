const { ECRClient, DescribeRegistryCommand } = require("@aws-sdk/client-ecr"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new ECRClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeRegistry() {
    const input = {}; // Empty input parameter

    const command = new DescribeRegistryCommand(input);

    try {
        const response = await client.send(command);
        console.log("Registry Description:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeRegistry ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ECR: Describe Registry", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeRegistry,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('ecr.txt')

}

//  main() 
module.exports = { main };
