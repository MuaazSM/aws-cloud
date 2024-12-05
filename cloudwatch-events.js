const { CloudWatchEventsClient, ListApiDestinationsCommand, ListArchivesCommand, ListConnectionsCommand, ListEventBusesCommand,
  ListEventSourcesCommand, ListReplaysCommand, ListRulesCommand,  
} = require("@aws-sdk/client-cloudwatch-events"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = ''; 
// Initialize the CloudWatchEventsClient outside the function
const client = new CloudWatchEventsClient(config);

async function listApiDestinations() {
const input = {};

const command = new ListApiDestinationsCommand(input);

try {
  const response = await client.send(command);
  console.log("API Destinations List:", JSON.stringify(response, null, 2)); // Pretty print the response
  accumulatedOutput += `\n--- listApiDestinations ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
  logger.error("Error: CloudWatchEvents: List API Destinations", error);
}
}

async function listArchives() {
  const input = {};

  const command = new ListArchivesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Archives List:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listArchives ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchEvents: List Archives", error);
  }
}

async function listConnections() {
  const input = {};

  const command = new ListConnectionsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Connections List:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listConnections ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchEvents: List Connections", error);
  }
}

async function listEventBuses() {
  const input = {};

  const command = new ListEventBusesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Event Buses List:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listEventBuses ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchEvents: List Event Buses", error);
  }
}

async function listEventSources() {
  const input = {};

  const command = new ListEventSourcesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Event Sources List:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listEventSources ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchEvents: List Event Sources", error);
  }
}

async function listReplays() {
  const input = {};

  const command = new ListReplaysCommand(input);

  try {
    const response = await client.send(command);
    console.log("Replays List:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listReplays ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchEvents: List Replays", error);
  }
}

async function listRules() {
  const input = {};

  const command = new ListRulesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Rules List:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listRules ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatchEvents: List Rules", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
  const functionsToExecute = [
      listApiDestinations,    
      listArchives, 
      listConnections, 
      listEventBuses,
      listEventSources,
      listReplays,   
      listRules, 
  ]
  for (const func of functionsToExecute) {
      try {
        await func(); // Await the function call
      } catch (error) {
        console.error(`Error executing ${func.name}:`, error);
      //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
      }
    }
    saveAllOutputToFile('cloudwatch-events.txt')
}
  

  //main()
  module.exports = { main }
