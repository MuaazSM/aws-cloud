const { IoTWirelessClient, ListDestinationsCommand, ListFuotaTasksCommand, ListMulticastGroupsCommand,
    ListPartnerAccountsCommand, ListServiceProfilesCommand, ListWirelessGatewaysCommand, 
 } = require("@aws-sdk/client-iot-wireless"); // CommonJS import
 const config = require('./awsConfig');
 const client = new IoTWirelessClient(config); // Initialize the IoT Wireless client
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listDestinations() {
    const input = {}; 

    const command = new ListDestinationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Destinations List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDestinations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoTWireless: listDestinations", error);    }
}

async function listFuotaTasks() {
    const input = {}; 

    const command = new ListFuotaTasksCommand(input);

    try {
        const response = await client.send(command);
        console.log("FUOTA Tasks List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listFuotaTasks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoTWireless: listFuotaTasks", error);    }
}

async function listMulticastGroups() {
    const input = {}; 

    const command = new ListMulticastGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Multicast Groups List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listMulticastGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoTWireless: listMulticastGroups", error);    }
}

async function listPartnerAccounts() {
    const input = {}; 

    const command = new ListPartnerAccountsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Partner Accounts List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listPartnerAccounts ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoTWireless: listPartnerAccounts", error);
    }
}

async function listServiceProfiles() {
    const input = {}; 

    const command = new ListServiceProfilesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Service Profiles List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listServiceProfiles ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoTWireless: listServiceProfiles", error);    }
}
async function listWirelessGateways() {
    const input = {}; 

    const command = new ListWirelessGatewaysCommand(input);

    try {
        const response = await client.send(command);
        console.log("Wireless Gateways List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listWirelessGateways ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoTWireless: listWirelessGateways", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listDestinations,    
        listFuotaTasks, 
        listMulticastGroups, 
        listPartnerAccounts, 
        listServiceProfiles, 
        listWirelessGateways, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('iot-wireless.txt')
    }
    // main()
    module.exports = { main }