const { CostExplorerClient, ListCostAllocationTagBackfillHistoryCommand } = require("@aws-sdk/client-cost-explorer"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new CostExplorerClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listCostAllocationTagBackfillHistory(nextToken = null, maxResults = null) {
    const input = {};

    const command = new ListCostAllocationTagBackfillHistoryCommand(input);

    try {
        const response = await client.send(command);
        console.log("Cost Allocation Tag Backfill History:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listCostAllocationTagBackfillHistory ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: CostExplorer: ListCostAllocationTagBackfillHistory", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listCostAllocationTagBackfillHistory,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('cost-explorer.txt')
    }
  //  main()

module.exports = { main };
