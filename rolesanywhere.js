const { RolesAnywhereClient, ListCrlsCommand, ListProfilesCommand, ListSubjectsCommand } = require("@aws-sdk/client-rolesanywhere"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new RolesAnywhereClient(config); // Create the RolesAnywhere client using the config
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listCrls() {
    const input = {}; // Empty input to retrieve all CRLs

    const command = new ListCrlsCommand(input);

    try {
        const response = await client.send(command);
        console.log("CRLs:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCrls ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: RolesAnywhere: listCrls", error);    
    }
}

async function listProfiles() {
    const input = {}; // Empty input to retrieve all profiles

    const command = new ListProfilesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Profiles:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listProfiles ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: RolesAnywhere: listProfiles", error);    
    }
}

async function listSubjects() {
    const input = {}; // Empty input to retrieve all subjects

    const command = new ListSubjectsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Subjects:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listSubjects ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: RolesAnywhere: listSubjects", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listCrls,    
        listProfiles, 
        listSubjects, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('rolesanywhere.txt')
    }
// main()

module.exports = { main };
