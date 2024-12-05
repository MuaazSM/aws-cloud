const { BedrockAgentClient, ListAgentsCommand, ListFlowsCommand, ListKnowledgeBasesCommand, ListPromptsCommand } = require("@aws-sdk/client-bedrock-agent");
const config = require('./awsConfig');
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';
const client = new BedrockAgentClient(config);

async function listAgents() {
    const input = {}; // Uncomment this line for no filters

    const command = new ListAgentsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listAgents ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: BedrockAgentClient: ListAgentsCommand", error);
    }
}

async function listFlows() {
    const input = {}; 

    const command = new ListFlowsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listFlows ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: BedrockAgentClient: ListFlowsCommand", error);
    }
}

async function listKnowledgeBases() {
    const input = {}; 

    const command = new ListKnowledgeBasesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listKnowledgeBases ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: BedrockAgentClient: ListKnowledgeBasesCommand", error);
    }
}

async function listPrompts() {
    const input = {}; 

    const command = new ListPromptsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listPrompts ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: BedrockAgentClient: ListPromptsCommand", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listAgents,    
        listFlows, 
        listKnowledgeBases, 
        listPrompts, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('bedrock-agent.txt')
    }
//  main()

module.exports = { main };
