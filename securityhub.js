const { SecurityHubClient, GetAdministratorAccountCommand, ListAutomationRulesCommand, ListConfigurationPoliciesCommand, ListMembersCommand } = require("@aws-sdk/client-securityhub"); // CommonJS import
const config = require('./awsConfig');  // Assuming you have a config file for AWS credentials
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

const client = new SecurityHubClient(config);

async function getAdministratorAccount() {
    const input = {};
    const command = new GetAdministratorAccountCommand(input);
    try {
        const response = await client.send(command);
        console.log("Administrator Account:", JSON.stringify(response, null, 2));
        accumulatedOutput += `\n--- getAdministratorAccount ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: SecurityHub: getAdministratorAccount", error);    
    }
}

async function listAutomationRules() {
    const input = {};

    const command = new ListAutomationRulesCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Automation Rules:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAutomationRules ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: SecurityHub: listAutomationRules", error);    
    }
}

async function listConfigurationPolicies() {
    const input = {};

    const command = new ListConfigurationPoliciesCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Configuration Policies:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConfigurationPolicies ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: SecurityHub: listConfigurationPolicies", error);    
    }
}

async function listMembers() {
    const input = {};

    const command = new ListMembersCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Security Hub Members:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listMembers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: SecurityHub: listMembers", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        getAdministratorAccount,    
        listAutomationRules,
        listConfigurationPolicies,  
        listMembers,  
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('securityhub.txt')

    }
// main()

module.exports = { main };
