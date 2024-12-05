const { ApiGatewayV2Client, GetApisCommand, GetDomainNamesCommand, GetVpcLinksCommand,  } = require("@aws-sdk/client-apigatewayv2"); // CommonJS import
const logger = require('./logger')
const fs = require('fs'); 
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new ApiGatewayV2Client(config);
let accumulatedOutput = '';

async function getApis() {
    const input = {
        
    };

    const command = new GetApisCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getApis ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApiGatewayV2: getApis", error);
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
         logger.error("Error: ApiGatewayV2: getDomainNames", error);
    }
}

async function getVpcLinks() {
    const input = {}

    const command = new GetVpcLinksCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getVpcLinks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApiGatewayV2: getVpcLinks", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    
  }

async function main() {
    const functionsToExecute = [
        getApis,    
        getDomainNames, 
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
      saveAllOutputToFile('apigatewayv2.txt')
    }
    //main()

    module.exports = { main };