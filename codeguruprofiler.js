const { CodeGuruProfilerClient, GetFindingsReportAccountSummaryCommand, ListProfilingGroupsCommand } = require("@aws-sdk/client-codeguruprofiler"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const client = new CodeGuruProfilerClient(config); // Create a client instance
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function getFindingsReportAccountSummary() {
    const input = {};

    const command = new GetFindingsReportAccountSummaryCommand(input);

    try {
        const response = await client.send(command);
        console.log("Findings Report Account Summary:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- getFindingsReportAccountSummary ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: CodeGuruProfiler: GetFindingsReportAccountSummary", error);
    }
}

async function listProfilingGroups() {
    const input = {};

    const command = new ListProfilingGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Profiling Groups:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listProfilingGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: CodeGuruProfiler: ListProfilingGroups", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        getFindingsReportAccountSummary,    
        listProfilingGroups, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('codeguruprofiler.txt')
    }
    //  main() 
    module.exports = { main };
