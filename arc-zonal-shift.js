const { ARCZonalShiftClient, GetAutoshiftObserverNotificationStatusCommand, ListAutoshiftsCommand, ListManagedResourcesCommand,
    ListZonalShiftsCommand, 
} = require("@aws-sdk/client-arc-zonal-shift"); // CommonJS import
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new ARCZonalShiftClient(config);

async function getAutoshiftObserverStatus() {
const input = {}; // No parameters required for this command

const command = new GetAutoshiftObserverNotificationStatusCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- getAutoshiftObserverStatus ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: ARCZonalShift: GetAutoshiftObserverNotificationStatus", error);
}
}

async function listAutoshifts() {
const input = {};

const command = new ListAutoshiftsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listAutoshifts ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: ARCZonalShift: ListAutoshifts", error);
}
}

async function listManagedResources() {
const input = {};

const command = new ListManagedResourcesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listManagedResources ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: ARCZonalShift: ListManagedResources", error);
}
}

async function listZonalShifts() {
const input = {};

const command = new ListZonalShiftsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listZonalShifts ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: ARCZonalShift: ListZonalShifts", error);
}
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}


async function main() {
const functionsToExecute = [
    getAutoshiftObserverStatus,    
    listAutoshifts,
    listManagedResources,  
    listZonalShifts, 
]
for (const func of functionsToExecute) {
    try {
      await func(); // Await the function call
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
    //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`); // Commented out for now
    }
}
saveAllOutputToFile('arc-zonal-shift.txt')
}

// main() 

module.exports = { main };
