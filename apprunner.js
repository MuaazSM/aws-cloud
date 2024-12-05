const { AppRunnerClient, ListAutoScalingConfigurationsCommand, ListConnectionsCommand, ListObservabilityConfigurationsCommand, 
    ListServicesCommand, ListVpcConnectorsCommand, ListVpcIngressConnectionsCommand, 
 } = require("@aws-sdk/client-apprunner"); // CommonJS import
 const logger = require('./logger')
 const fs = require('fs'); 
let accumulatedOutput = '';


const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AppRunnerClient(config);

async function listAutoScalingConfigurations() {
    const input = {
    };

    const command = new ListAutoScalingConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listAutoScalingConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppRunner: listAutoScalingConfigurations", error);
    }
}

async function listConnections() {
    const input = {
    };

    const command = new ListConnectionsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listConnections ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppRunner: listConnections", error);
    }
}

async function listObservabilityConfigurations() {
    const input = {
    };

    const command = new ListObservabilityConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listObservabilityConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppRunner: listObservabilityConfigurations", error);
    }
}

async function listServices() {
    const input = {
    };

    const command = new ListServicesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listServices ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppRunner: listServices", error);
    }
}

async function listVpcConnectors() {
    const input = {
    };

    const command = new ListVpcConnectorsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listVpcConnectors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppRunner: listVpcConnectors", error);
    }
}

async function listVpcIngressConnections() {
    const input = {
        
    };

    const command = new ListVpcIngressConnectionsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listVpcIngressConnections ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppRunner: listVpcIngressConnections", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        listAutoScalingConfigurations,    
        listConnections, 
        listObservabilityConfigurations, 
        listServices, 
        listVpcConnectors, 
        listVpcIngressConnections, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('apprunner.txt')
    }
    //main()
    module.exports = { main };