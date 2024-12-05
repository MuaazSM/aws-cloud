const { APIGatewayClient, GetAccountCommand, GetApiKeysCommand, GetClientCertificatesCommand, GetDomainNamesCommand, 
    GetRestApisCommand, GetSdkTypesCommand, GetUsagePlansCommand, GetVpcLinksCommand, 
  } = require("@aws-sdk/client-api-gateway"); // CommonJS import
  const logger = require('./logger')
  const fs = require('fs'); 
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new APIGatewayClient(config);
let accumulatedOutput = '';

async function getAccountInfo() {
    const input = {}; // No parameters needed for GetAccountCommand
    const command = new GetAccountCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getAccountInfo ---\n${JSON.stringify(response, null, 2)}\n`;
    } catch (error) {
         logger.error("Error: APIGateway: get Account Info", error);
    }
}

async function getApiKeys() {
    const input = {
       
    };

    const command = new GetApiKeysCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- GetApiKeysCommand ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: APIGateway: getApiKeys", error);
    }
}

async function getClientCertificates() {
    const input = {
    };

    const command = new GetClientCertificatesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getClientCertificates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: APIGateway: getClientCertificates", error);
    }
}

async function getDomainNames() {
    const input = {
       
    };

    const command = new GetDomainNamesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getDomainNames ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: APIGateway: getDomainNames", error);
    }
}

async function getRestApis() {
    const input = {
       
    };

    const command = new GetRestApisCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getRestApis ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: APIGateway: getRestApis", error);
    }
}

async function getSdkTypes() {
    const input = {
       
    };

    const command = new GetSdkTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getSdkTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: APIGateway: getSdkTypes", error);
    }
}

async function getUsagePlans() {
    const input = {
    
    };

    const command = new GetUsagePlansCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getUsagePlans ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: APIGateway: getUsagePlans", error);
    }
}

async function getVpcLinks() {
    const input = {};

    const command = new GetVpcLinksCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getVpcLinks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: APIGateway: getVpcLinks", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        getAccountInfo,   
        getApiKeys,
        getClientCertificates,  
        getDomainNames, 
        getRestApis, 
        getSdkTypes, 
        getUsagePlans, 
        getVpcLinks, 

    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('api-gateway.txt');
    }
    main()
    module.exports = { main };