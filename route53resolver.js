const { Route53ResolverClient, ListFirewallRuleGroupsCommand, ListResolverEndpointsCommand, ListResolverRulesCommand } = require("@aws-sdk/client-route53resolver"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration file
const client = new Route53ResolverClient(config); // Create the client using the AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function listFirewallRuleGroups() {
    const input = {};

    const command = new ListFirewallRuleGroupsCommand(input);

    try {
        const response = await client.send(command); // Send the command and get the response
        console.log("Firewall Rule Groups:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listFirewallRuleGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Route53Resolver:", error);    
    }
}

async function listResolverEndpoints() {
    const input = {};  // Empty input, no filters, no MaxResults, no NextToken

    const command = new ListResolverEndpointsCommand(input);

    try {
        const response = await client.send(command);  // Send the command and await the response
        console.log("Resolver Endpoints:", JSON.stringify(response, null, 2));  // Log the response
    } catch (error) {
        logger.error("Error: Route53Resolver: listResolverEndpoints", error);    
    }
}

async function listResolverRules() {
    // Set up the input parameters
    const input = {};

    const command = new ListResolverRulesCommand(input);

    try {
        const response = await client.send(command);  // Send the command and await the response
        console.log("Resolver Rules:", JSON.stringify(response, null, 2));  // Log the response to console
    } catch (error) {
        logger.error("Error: Route53Resolver: listResolverRules", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        listFirewallRuleGroups,    
        listResolverEndpoints, 
        listResolverRules, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('route53resolver.txt')

    }
// main()

module.exports = { main };
