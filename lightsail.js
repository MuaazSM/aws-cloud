const { LightsailClient, GetDisksCommand, GetActiveNamesCommand, GetDiskSnapshotsCommand, GetDomainsCommand,
    GetInstanceSnapshotsCommand, GetKeyPairsCommand, GetLoadBalancersCommand, GetStaticIpsCommand, 
} = require("@aws-sdk/client-lightsail"); // CommonJS import
const config = require('./awsConfig');
const client = new LightsailClient(config); // Initialize the Lightsail client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function getDisks() {
    const input = {}; 
    const command = new GetDisksCommand(input);

    try {
        const response = await client.send(command);
        console.log("Disks List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getDisks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Lightsail: GetDisks", error); // Updated error logging
    }
}

async function getActiveNames() {
    const input = {}; 
    const command = new GetActiveNamesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Active Names List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getActiveNames ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Lightsail: GetActiveNames", error); // Updated error logging
    }
}

async function getDiskSnapshots() {
    const input = {}; 
    const command = new GetDiskSnapshotsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Disk Snapshots List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getDiskSnapshots ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Lightsail: GetDiskSnapshots", error); // Updated error logging
    }
}

async function getDomains() {
    const input = {}; 
    const command = new GetDomainsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Domains List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getDomains ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Lightsail: GetDomains", error); // Updated error logging
    }
}

async function getInstanceSnapshots() {
    const input = {}; 
    const command = new GetInstanceSnapshotsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Instance Snapshots List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getInstanceSnapshots ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Lightsail: GetInstanceSnapshots", error); // Updated error logging
    }
}

async function getKeyPairs() {
    const input = {}; 
    const command = new GetKeyPairsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Key Pairs List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getKeyPairs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Lightsail: GetKeyPairs", error); // Updated error logging
    }
}

async function getLoadBalancers() {
    const input = {}; 
    const command = new GetLoadBalancersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Load Balancers List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getLoadBalancers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Lightsail: GetLoadBalancers", error); // Updated error logging
    }
}

async function getStaticIps() {
    const input = {}; 
    const command = new GetStaticIpsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Static IPs List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- getStaticIps ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Lightsail: GetStaticIps", error); // Updated error logging
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        getDisks,    
        getActiveNames, 
        getDiskSnapshots, 
        getDomains, 
        getInstanceSnapshots, 
        getKeyPairs, 
        getLoadBalancers, 
        getStaticIps, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('lightsail.txt')
}

//  main() 

module.exports = { main };
