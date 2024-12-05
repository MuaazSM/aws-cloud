const { ElasticsearchServiceClient, ListDomainNamesCommand, ListVpcEndpointsCommand } = require("@aws-sdk/client-elasticsearch-service"); // CommonJS import
const config = require('./awsConfig');
const client = new ElasticsearchServiceClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listDomainNames() {
    const input = {}; // Empty input object

    const command = new ListDomainNamesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Domain Names:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDomainNames ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ElasticsearchService: List Domain Names", error); // Updated error log format
    }
}

async function listVpcEndpoints() {
    const input = {}; // Empty input object

    const command = new ListVpcEndpointsCommand(input);

    try {
        const response = await client.send(command);
        console.log("VPC Endpoints:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listVpcEndpoints ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ElasticsearchService: List VPC Endpoints", error); // Updated error log format
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        listDomainNames,    
        listVpcEndpoints,  
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('elasticsearch-service.txt')

}

//  main() 

module.exports = { main };
