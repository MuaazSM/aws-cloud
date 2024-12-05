const { CloudControlClient, ListResourceRequestsCommand } = require("@aws-sdk/client-cloudcontrol"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the CloudControlClient outside the function
const client = new CloudControlClient(config);

async function listResourceRequests() {
  const input = {}; 

  const command = new ListResourceRequestsCommand(input);

  try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2))
    accumulatedOutput += `\n--- listResourceRequests ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudControlClient: ListResourceRequestsCommand", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listResourceRequests,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('cloudfront.txt')
    }
//  main()

module.exports = { main };
