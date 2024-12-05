const { MgnClient, DescribeVcenterClientsCommand } = require("@aws-sdk/client-mgn"); // CommonJS import
const config = require('./awsConfig'); // Assuming this contains your AWS configuration
const logger = require('./logger'); // Assuming this is your logger setup
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the Mgn client with the config
const client = new MgnClient(config); 

async function describeVcenterClients() {
    const input = {};

    const command = new DescribeVcenterClientsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Vcenter Clients:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeVcenterClients ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MgnClient: DescribeVcenterClients", error); // Log the error
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeVcenterClients,    
    ];

    for (const func of functionsToExecute) {
        try {
            await func(); // Await the function call
        } catch (error) {
            console.error(`Error executing ${func.name}:`, error);
            // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('mgn.txt')
}

//  main() 

module.exports = { main };
