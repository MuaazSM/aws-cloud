const { LicenseManagerClient, ListLicenseConfigurationsCommand, ListLicenseConversionTasksCommand, ListLicenseManagerReportGeneratorsCommand,
    ListLicensesCommand,
} = require("@aws-sdk/client-license-manager"); // CommonJS import

const config = require('./awsConfig');
const client = new LicenseManagerClient(config); // Initialize the License Manager client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listLicenseConfigurations() {
    const input = {}; 

    const command = new ListLicenseConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("License Configurations List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listLicenseConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error listing License Configurations:", error);
    }
}

async function listLicenseConversionTasks() {
    const input = {}; 

    const command = new ListLicenseConversionTasksCommand(input);

    try {
        const response = await client.send(command);
        console.log("License Conversion Tasks List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listLicenseConversionTasks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error listing License Conversion Tasks:", error);
    }
}

async function listLicenseManagerReportGenerators() {
    const input = {}; 

    const command = new ListLicenseManagerReportGeneratorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("License Manager Report Generators List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listLicenseManagerReportGenerators ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error listing License Manager Report Generators:", error);
    }
}

async function listLicenses() {
    const input = {}; 

    const command = new ListLicensesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Licenses List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listLicenses ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error listing Licenses:", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listLicenseConfigurations,
        listLicenseConversionTasks,
        listLicenseManagerReportGenerators,
        listLicenses,
    ];

    for (const func of functionsToExecute) {
        try {
            await func(); // Await the function call
        } catch (error) {
            console.error(`Error executing ${func.name}:`, error);
            // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }

    saveAllOutputToFile('license-manager.txt')
}

//  main();

module.exports = { main };
