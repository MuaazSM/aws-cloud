// index.js
const { BillingconductorClient, ListAccountAssociationsCommand, ListBillingGroupCostReportsCommand, 
    ListBillingGroupsCommand, ListCustomLineItemsCommand, ListPricingPlansCommand, ListPricingRulesCommand, 
} = require("@aws-sdk/client-billingconductor");
const config = require('./awsConfig');
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

const client = new BillingconductorClient(config);

async function listAccountAssociations() {
const input = {}; 

const command = new ListAccountAssociationsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listAccountAssociations ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BillingconductorClient: ListAccountAssociationsCommand", error);
}
}

async function listBillingGroupCostReports() {
const input = {}; 

const command = new ListBillingGroupCostReportsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listBillingGroupCostReports ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BillingconductorClient: ListBillingGroupCostReportsCommand", error);
}
}

async function listBillingGroups() {
const input = {}; 

const command = new ListBillingGroupsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listBillingGroups ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BillingconductorClient: ListBillingGroupsCommand", error);
}
}

async function listCustomLineItems() {
const input = {}; 

const command = new ListCustomLineItemsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listCustomLineItems ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BillingconductorClient: ListCustomLineItemsCommand", error);
}
}

async function listPricingPlans() {
const input = {}; 

const command = new ListPricingPlansCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listPricingPlans ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BillingconductorClient: ListPricingPlansCommand", error);
}
}

async function listPricingRules() {
const input = {}; 

const command = new ListPricingRulesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listPricingRules ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BillingconductorClient: ListPricingRulesCommand", error);
}
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
const functionsToExecute = [
    listAccountAssociations,    
    listBillingGroupCostReports, 
    listBillingGroups, 
    listCustomLineItems, 
    listPricingPlans, 
    listPricingRules, 
]
for (const func of functionsToExecute) {
    try {
      await func(); // Await the function call
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
    //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
    }
  }
  saveAllOutputToFile('billingconductor.txt')
}
//  main()

module.exports = { main };
