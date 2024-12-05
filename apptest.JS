const { AppTestClient, ListTestCasesCommand, ListTestConfigurationsCommand, ListTestSuitesCommand,  } = require("@aws-sdk/client-apptest"); // CommonJS import
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AppTestClient(config);

async function listTestCases() {
    const input = {
    };

    const command = new ListTestCasesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listTestCases ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppTest: ListTestCases", error);
    }
}

async function listTestConfigurations() {
    const input = {
    };

    const command = new ListTestConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listTestConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppTest: ListTestConfigurations", error);
    }
}

async function listTestSuites() {
    const input = {
    };

    const command = new ListTestSuitesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listTestSuites ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppTest: ListTestSuites", error);
    }
}
function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listTestCases,    
        listTestConfigurations,   
        listTestSuites,   
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`); // Commented out for now
        }
    }
    saveAllOutputToFile('apptest.txt')
}

 //main() 

module.exports = { main };
