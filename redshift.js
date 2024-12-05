const { RedshiftClient, DescribeAccountAttributesCommand } = require("@aws-sdk/client-redshift"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new RedshiftClient(config); // Create the Redshift client using the config
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeAccountAttributes() {
    const input = {}; // Leave input empty to retrieve all account attributes

    const command = new DescribeAccountAttributesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Account Attributes:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeAccountAttributes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: Redshift:", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        describeAccountAttributes,    

    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('redshift.txt')  
    }
// main()

module.exports = { main };
