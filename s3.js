const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3"); // CommonJS import

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new S3Client(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listBuckets() {
    const input = {};

    const command = new ListBucketsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listBuckets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: S3: listBuckets", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
listBuckets,
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('s3.txt')

    }
    // main()
    module.exports = { main }
