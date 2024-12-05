const { MediaLiveClient, ListChannelsCommand, ListClustersCommand, ListInputDevicesCommand, ListInputSecurityGroupsCommand,
    ListInputsCommand, ListMultiplexesCommand, ListNetworksCommand, 
 } = require("@aws-sdk/client-medialive"); // CommonJS import

 const config = require('./awsConfig');
 const client = new MediaLiveClient(config); // Initialize the MediaLive client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';


async function listChannels() {
    const input = {};

    const command = new ListChannelsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Channels:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listChannels ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaLive: ListChannels", error);    } // Updated error logging
}

async function listClusters() {
    const input = {};

    const command = new ListClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Clusters:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaLive: ListClusters", error);    } // Updated error logging
}

async function listInputDevices() {
    const input = {};

    const command = new ListInputDevicesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Input Devices:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listInputDevices ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaLive: ListInputDevices", error);    } // Updated error logging
}

async function listInputSecurityGroups() {
    const input = {};

    const command = new ListInputSecurityGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Input Security Groups:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listInputSecurityGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaLive: ListInputSecurityGroups", error);    } // Updated error logging
}

async function listInputs() {
    const input = {};

    const command = new ListInputsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Inputs:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listInputs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaLive: ListInputs", error);    } // Updated error logging
}

async function listMultiplexes() {
    const input = {};

    const command = new ListMultiplexesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Multiplexes:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listMultiplexes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaLive: ListMultiplexes", error);    } // Updated error logging
}

async function listNetworks() {
    const input = {};

    const command = new ListNetworksCommand(input);

    try {
        const response = await client.send(command);
        console.log("Networks:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listNetworks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaLive: ListNetworks", error);    } // Updated error logging
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listChannels,    
        listClusters, 
        listInputDevices, 
        listInputSecurityGroups, 
        listInputs, 
        listMultiplexes, 
        listNetworks, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('medialive.txt')
}

// main() 

module.exports = { main };
