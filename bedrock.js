const { BedrockClient, GetModelInvocationLoggingConfigurationCommand, ListCustomModelsCommand, ListFoundationModelsCommand, 
    ListGuardrailsCommand, ListImportedModelsCommand, ListInferenceProfilesCommand, ListModelCopyJobsCommand, ListModelCustomizationJobsCommand,
    ListModelImportJobsCommand, ListModelInvocationJobsCommand, ListProvisionedModelThroughputsCommand, 

} = require("@aws-sdk/client-bedrock");
const config = require('./awsConfig');
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

const client = new BedrockClient(config);

async function getModelInvocationLoggingConfiguration() {
const input = {}; // No parameters are required for this command
const command = new GetModelInvocationLoggingConfigurationCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- getModelInvocationLoggingConfiguration ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: GetModelInvocationLoggingConfigurationCommand", error);
}
}

async function listCustomModels() {
const input = {}; // Empty input; no filters will be applied
const command = new ListCustomModelsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listCustomModels ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListCustomModelsCommand", error);
}
}

async function listFoundationModels() {
const input = {}; // Uncomment this line for no filters

const command = new ListFoundationModelsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listFoundationModels ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListFoundationModelsCommand", error);
}
}

async function listGuardrails() {

const input = {}; // Uncomment this line for no filters

const command = new ListGuardrailsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listGuardrails ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListGuardrailsCommand", error);
}
}

async function listImportedModels() {

const input = {}; // Uncomment this line for no filters

const command = new ListImportedModelsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listImportedModels ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListImportedModelsCommand", error);
}
}

async function listInferenceProfiles() {
const input = {}; 

const command = new ListInferenceProfilesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listInferenceProfiles ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListInferenceProfilesCommand", error);
}
}

async function listModelCopyJobs() {

const input = {}; 

const command = new ListModelCopyJobsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listModelCopyJobs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListModelCopyJobsCommand", error);
}
}

async function listModelCustomizationJobs() {

const input = {}; 

const command = new ListModelCustomizationJobsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listModelCustomizationJobs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListModelCustomizationJobsCommand", error);
}
}

async function listModelImportJobs() {

 const input = {}; 

const command = new ListModelImportJobsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listModelImportJobs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListModelImportJobsCommand", error);
}
}

async function listModelInvocationJobs() {

const input = {}; 

const command = new ListModelInvocationJobsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listModelInvocationJobs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListModelInvocationJobsCommand", error);
}
}

async function listProvisionedModelThroughputs() {
const input = {}; 

const command = new ListProvisionedModelThroughputsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listProvisionedModelThroughputs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: BedrockClient: ListProvisionedModelThroughputsCommand", error);
}
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
const functionsToExecute = [
    getModelInvocationLoggingConfiguration,    
    listCustomModels, 
    listFoundationModels, 
    listGuardrails, 
    listImportedModels,
    listInferenceProfiles,
    listModelCopyJobs,
    listModelCustomizationJobs, 
    listModelImportJobs, 
    listModelInvocationJobs, 
    listProvisionedModelThroughputs, 
]
for (const func of functionsToExecute) {
    try {
      await func(); // Await the function call
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
    //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
    }
  }
  saveAllOutputToFile('bedrock.txt')
}
// main()

module.exports = { main };
