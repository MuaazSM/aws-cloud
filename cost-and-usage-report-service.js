const { CostAndUsageReportServiceClient, DescribeReportDefinitionsCommand } = require("@aws-sdk/client-cost-and-usage-report-service"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const client = new CostAndUsageReportServiceClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeReportDefinitions(nextToken = null, maxResults = null) {
    const input = {};

    const command = new DescribeReportDefinitionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Report Definitions:", JSON.stringify(response, null, 2)); 
        accumulatedOutput += `\n--- describeReportDefinitions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: CostAndUsageReportService: DescribeReportDefinitions", error);    
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeReportDefinitions,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('cost-and-usage-report-service.txt')
    }
  //  main()

module.exports = { main };
