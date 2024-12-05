// index.js
const { ChatbotClient, DescribeChimeWebhookConfigurationsCommand, DescribeSlackChannelConfigurationsCommand, 
  DescribeSlackWorkspacesCommand, GetAccountPreferencesCommand, ListMicrosoftTeamsConfiguredTeamsCommand, 
} = require("@aws-sdk/client-chatbot");
const config = require('./awsConfig');
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

const client = new ChatbotClient(config);

async function describeChimeWebhookConfigurations() {
  const input = {}; 

  const command = new DescribeChimeWebhookConfigurationsCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
      accumulatedOutput += `\n--- describeChimeWebhookConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error: ChatbotClient: DescribeChimeWebhookConfigurationsCommand", error);
  }
}

async function describeSlackChannelConfigurations() {
  const input = {};

  const command = new DescribeSlackChannelConfigurationsCommand(input);

  try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2))
    accumulatedOutput += `\n--- describeSlackChannelConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ChatbotClient: DescribeSlackChannelConfigurationsCommand", error);
  }
}

async function describeSlackWorkspaces() {
  const input = {};

  const command = new DescribeSlackWorkspacesCommand(input);

  try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2))
    accumulatedOutput += `\n--- describeSlackWorkspaces ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ChatbotClient: DescribeSlackWorkspacesCommand", error);
  }
}

async function getAccountPreferences() {
  const input = {}; // No parameters are required for this command

  const command = new GetAccountPreferencesCommand(input);

  try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2))
    accumulatedOutput += `\n--- getAccountPreferences ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ChatbotClient: GetAccountPreferencesCommand", error);
  }
}

async function listMicrosoftTeamsConfiguredTeams() {
  const input = {};

  const command = new ListMicrosoftTeamsConfiguredTeamsCommand(input);

  try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- listMicrosoftTeamsConfiguredTeams ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ChatbotClient: ListMicrosoftTeamsConfiguredTeamsCommand", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
  const functionsToExecute = [
      describeChimeWebhookConfigurations,    
      describeSlackChannelConfigurations, 
      describeSlackWorkspaces, 
      getAccountPreferences, 
      listMicrosoftTeamsConfiguredTeams
  ]
  for (const func of functionsToExecute) {
      try {
        await func(); // Await the function call
      } catch (error) {
        console.error(`Error executing ${func.name}:`, error);
      //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
      }
    }
    saveAllOutputToFile('chatbot.txt')
  }
//  main()

module.exports = { main };
