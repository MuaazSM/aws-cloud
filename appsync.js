const { AppSyncClient, ListDomainNamesCommand, ListGraphqlApisCommand,  } = require("@aws-sdk/client-appsync"); // CommonJS import
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AppSyncClient(config);

async function listDomainNames() {
    const input = {
        
    };

    const command = new ListDomainNamesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listDomainNames ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppSync: ListDomainNames", error);
    }
}

async function listGraphqlApis() {
    const input = {
    };

    const command = new ListGraphqlApisCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listGraphqlApis ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppSync: ListGraphqlApis", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        listDomainNames,    
        listGraphqlApis, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`); // Commented out for now
        }
    }
    saveAllOutputToFile('appsync.txt')
}

//  main()

module.exports = { main };
