const { AppMeshClient, ListMeshesCommand } = require("@aws-sdk/client-app-mesh"); // CommonJS import
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AppMeshClient(config);

async function listMeshes() {
    const input = {};

    const command = new ListMeshesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeRegistry ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppMesh: listMeshes", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listMeshes,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('app-mesh.txt')
    }
    //main()
    module.exports = { main };