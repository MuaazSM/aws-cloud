const { ACMClient, GetAccountConfigurationCommand, ListCertificatesCommand  } = require("@aws-sdk/client-acm"); // CommonJS import
const logger = require('./logger')

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new ACMClient(config);
const fs = require('fs'); 
let accumulatedOutput = '';

async function getAccountConfiguration() {
    const input = {}; // No parameters needed

    const command = new GetAccountConfigurationCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getAccountConfiguration ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: acm: get Account Configuration", error);
    }
}

async function listCertificates() {
    const input = {};

    const command = new ListCertificatesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listCertificates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: acm: list Certificates", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        getAccountConfiguration,
        listCertificates, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
           //logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('acm.txt')
    }
    //main()


    module.exports = { main };