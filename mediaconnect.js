const { MediaConnectClient, ListEntitlementsCommand, ListFlowsCommand, ListGatewayInstancesCommand, ListGatewaysCommand, ListOfferingsCommand,
    ListReservationsCommand, 
 } = require("@aws-sdk/client-mediaconnect"); // CommonJS import
 const config = require('./awsConfig');
 const client = new MediaConnectClient(config); // Initialize the MediaConnect client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listEntitlements() {
    const input = {};

    const command = new ListEntitlementsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Entitlements:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listEntitlements ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaConnect: ListEntitlements", error);    } // Updated error logging
}

async function listFlows() {
    const input = {};

    const command = new ListFlowsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Flows:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listFlows ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaConnect: ListFlows", error);    } // Updated error logging
}

async function listGatewayInstances() {
    const input = {};

    const command = new ListGatewayInstancesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Gateway Instances:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listGatewayInstances ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaConnect: ListGatewayInstances", error);    } // Updated error logging
}

async function listGateways() {
    const input = {};

    const command = new ListGatewaysCommand(input);

    try {
        const response = await client.send(command);
        console.log("Gateways:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listGateways ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaConnect: ListGateways", error);    } // Updated error logging
}

async function listOfferings() {
    const input = {};

    const command = new ListOfferingsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Offerings:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listOfferings ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaConnect: ListOfferings", error);    } // Updated error logging
}

async function listReservations() {
    const input = {};

    const command = new ListReservationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Reservations:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listReservations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: MediaConnect: ListReservations", error);    } // Updated error logging
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listEntitlements,    
        listFlows, 
        listGatewayInstances, 
        listGateways, 
        listOfferings, 
        listReservations, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('mediaconnect.txt')
}

//  main() 

module.exports = { main };
