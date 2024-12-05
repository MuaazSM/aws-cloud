const { CloudWatchLogsClient, DescribeConfigurationTemplatesCommand, DescribeDeliveriesCommand, DescribeDeliveryDestinationsCommand,
  DescribeDeliverySourcesCommand, DescribeDestinationsCommand, DescribeResourcePoliciesCommand, ListLogAnomalyDetectorsCommand, 
} = require("@aws-sdk/client-cloudwatch-logs"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = ''; 

// Initialize the CloudWatchLogsClient outside the function
const client = new CloudWatchLogsClient(config);

async function describeConfigurationTemplates() {
const input = {};

const command = new DescribeConfigurationTemplatesCommand(input);

try {
  const response = await client.send(command);
  console.log("Configuration Templates:", JSON.stringify(response, null, 2)); // Pretty print the response
  accumulatedOutput += `\n--- describeConfigurationTemplates ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
  logger.error("Error: CloudWatchLogs: Describe Configuration Templates", error);
}
}

async function describeDeliveries() {
  const input = {};

  const command = new DescribeDeliveriesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Deliveries:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- describeDeliveries ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchLogs: Describe Deliveries", error);
  }
}

async function describeDeliveryDestinations() {
  const input = {};

  const command = new DescribeDeliveryDestinationsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Delivery Destinations:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- describeDeliveryDestinations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchLogs: Describe Delivery Destinations", error);
  }
}

async function describeDeliverySources() {
  const input = {};

  const command = new DescribeDeliverySourcesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Delivery Sources:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- describeDeliverySources ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchLogs: Describe Delivery Sources", error);
  }
}

async function describeDestinations() {
  const input = {};

  const command = new DescribeDestinationsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Destinations:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- describeDestinations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchLogs: Describe Destinations", error);
  }
}

async function describeResourcePolicies() {
  const input = {};

  const command = new DescribeResourcePoliciesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Resource Policies:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- describeResourcePolicies ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchLogs: Describe Resource Policies", error);
  }
}

async function listLogAnomalyDetectors() {
  const input = {};

  const command = new ListLogAnomalyDetectorsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Log Anomaly Detectors:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listLogAnomalyDetectors ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchLogs: List Log Anomaly Detectors", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
  const functionsToExecute = [
      describeConfigurationTemplates,    
      describeDeliveries, 
      describeDeliveryDestinations, 
      describeDeliverySources,
      describeDestinations,  
      describeResourcePolicies, 
      listLogAnomalyDetectors, 
  ]
  for (const func of functionsToExecute) {
      try {
        await func(); // Await the function call
      } catch (error) {
        console.error(`Error executing ${func.name}:`, error);
      //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
      }
    }
    saveAllOutputToFile('cloudwatch-logs.txt')

  }
   //main() 
  module.exports = { main };
