const { ElasticLoadBalancingClient, DescribeAccountLimitsCommand } = require("@aws-sdk/client-elastic-load-balancing"); // CommonJS import
const config = require('./awsConfig');
const client = new ElasticLoadBalancingClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeAccountLimits() {
    const input = {};

    const command = new DescribeAccountLimitsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Account Limits:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeAccountLimits ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ElasticLoadBalancing: Describe Account Limits", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        describeAccountLimits,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('elastic-load-balancing.txt')

}

//  main() 

module.exports = { main };
