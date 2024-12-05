const { ApplicationCostProfilerClient, ListReportDefinitionsCommand } = require("@aws-sdk/client-applicationcostprofiler"); // CommonJS import

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new ApplicationCostProfilerClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listReportDefinitions() {
    const input = {
    };

    const command = new ListReportDefinitionsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listReportDefinitions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: ApplicationCostProfiler: listReportDefinitions", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listReportDefinitions,    
 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('applicationcostprofiler.txt')
    }
    //main()
    module.exports = { main };
    