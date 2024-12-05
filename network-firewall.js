const { NetworkFirewallClient, ListFirewallPoliciesCommand } = require("@aws-sdk/client-network-firewall"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new NetworkFirewallClient(config); // Create the Network Firewall client using the config
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listFirewallPolicies() {
    const input = {};

    const command = new ListFirewallPoliciesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Firewall Policies:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listFirewallPolicies ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: NetworkFirewall: ListFirewallPolicies", error);    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        listFirewallPolicies,    
    ];
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('network-firewall.txt')
}

 main(); 

module.exports = { main };
