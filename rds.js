const { RDSClient, DescribeAccountAttributesCommand, DescribeCertificatesCommand } = require("@aws-sdk/client-rds"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new RDSClient(config); // Create the RDS client using the config
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeAccountAttributes() {
    const input = {}; // Empty input object for DescribeAccountAttributesCommand, as no parameters are required.

    const command = new DescribeAccountAttributesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Account Attributes:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeAccountAttributes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: RDS:", error);    
    }
}

async function describeCertificates() {
    const input = {}; // Empty input to retrieve all certificates

    const command = new DescribeCertificatesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Certificates:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeCertificates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: RDS:", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }


async function main() {
    const functionsToExecute = [
        describeAccountAttributes,    
        describeCertificates, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('rds.txt')
    }
// main()

module.exports = { main };
