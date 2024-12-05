const { B2biClient, ListCapabilitiesCommand, ListPartnershipsCommand, ListProfilesCommand, ListTransformersCommand, } = require("@aws-sdk/client-b2bi"); // CommonJS import
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new B2biClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listCapabilities() {
    const input = {}; // No parameters are required for this command

    const command = new ListCapabilitiesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeRegistry ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: B2Bi: List Capabilities", error);
    }
}

async function listPartnerships() {
    const input = {}; // No parameters are required for this command

    const command = new ListPartnershipsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listPartnerships ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: B2Bi: List Partnerships", error);
    }
}

async function listProfiles() {
    const input = {}; // No parameters are required for this command

    const command = new ListProfilesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listProfiles ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: B2Bi: List Profiles", error);
    }
}

async function listTransformers() {
    const input = {}; // No parameters are required for this command

    const command = new ListTransformersCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listTransformers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: B2Bi: List Transformers", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listCapabilities,    
        listPartnerships, 
        listProfiles, 
        listTransformers, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        }
      }
      saveAllOutputToFile('b2bi.txt')
    }
//  main() 

module.exports = { main };
