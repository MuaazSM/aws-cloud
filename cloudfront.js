const { CloudFrontClient, ListCachePoliciesCommand, ListCloudFrontOriginAccessIdentitiesCommand, ListContinuousDeploymentPoliciesCommand,
  ListDistributionsCommand, ListFieldLevelEncryptionConfigsCommand, ListFieldLevelEncryptionProfilesCommand, ListFunctionsCommand,
  ListKeyGroupsCommand, ListKeyValueStoresCommand, ListOriginAccessControlsCommand, ListOriginRequestPoliciesCommand, ListPublicKeysCommand,
  ListRealtimeLogConfigsCommand, ListResponseHeadersPoliciesCommand, ListStreamingDistributionsCommand, 
} = require("@aws-sdk/client-cloudfront"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the CloudFrontClient outside the function
const client = new CloudFrontClient(config);

async function listCachePolicies() {
const input = {}; // Keep the input empty if parameters are not necessary

const command = new ListCachePoliciesCommand(input);

try {
  const response = await client.send(command);
  console.log("Cache Policies:", JSON.stringify(response, null, 2)); // Pretty print the response
  accumulatedOutput += `\n--- listCachePolicies ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
  logger.error("Error: CloudFrontClient: ListCachePoliciesCommand", error);
}
}

async function listCloudFrontOriginAccessIdentities() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListCloudFrontOriginAccessIdentitiesCommand(input);

  try {
    const response = await client.send(command);
    console.log("CloudFront Origin Access Identities:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listCloudFrontOriginAccessIdentities ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListCloudFrontOriginAccessIdentitiesCommand", error);
  }
}

async function listContinuousDeploymentPolicies() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListContinuousDeploymentPoliciesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Continuous Deployment Policies:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listContinuousDeploymentPolicies ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListContinuousDeploymentPoliciesCommand", error);
  }
}

async function listDistributions() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListDistributionsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Distributions:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listDistributions ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListDistributionsCommand", error);
  }
}

async function listFieldLevelEncryptionConfigs() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListFieldLevelEncryptionConfigsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Field Level Encryption Configs:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listFieldLevelEncryptionConfigs ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListFieldLevelEncryptionConfigsCommand", error);
  }
}

async function listFieldLevelEncryptionProfiles() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListFieldLevelEncryptionProfilesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Field Level Encryption Profiles:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listFieldLevelEncryptionProfiles ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListFieldLevelEncryptionProfilesCommand", error);
  }
}

async function listFunctions() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListFunctionsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Functions:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listFunctions ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListFunctionsCommand", error);
  }
}

async function listKeyGroups() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListKeyGroupsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Key Groups:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listKeyGroups ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListKeyGroupsCommand", error);
  }
}

async function listKeyValueStores() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListKeyValueStoresCommand(input);

  try {
    const response = await client.send(command);
    console.log("Key Value Stores:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listKeyValueStores ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListKeyValueStoresCommand", error);
  }
}

async function listOriginAccessControls() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListOriginAccessControlsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Origin Access Controls:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listOriginAccessControls ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListOriginAccessControlsCommand", error);
  }
}

async function listOriginRequestPolicies() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListOriginRequestPoliciesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Origin Request Policies:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listOriginRequestPolicies ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListOriginRequestPoliciesCommand", error);
  }
}

async function listPublicKeys() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListPublicKeysCommand(input);

  try {
    const response = await client.send(command);
    console.log("Public Keys:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listPublicKeys ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListPublicKeysCommand", error);
  }
}

async function listRealtimeLogConfigs() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListRealtimeLogConfigsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Realtime Log Configs:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listRealtimeLogConfigs ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListRealtimeLogConfigsCommand", error);
  }
}

async function listResponseHeadersPolicies() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListResponseHeadersPoliciesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Response Headers Policies:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listResponseHeadersPolicies ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: ListResponseHeadersPoliciesCommand", error);
    
  }
}

async function listStreamingDistributions() {
  const input = {}; // Keep the input empty if parameters are not necessary

  const command = new ListStreamingDistributionsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Streaming Distributions:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listStreamingDistributions ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudFrontClient: listStreamingDistributions", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  
}

async function main() {
  const functionsToExecute = [
      listCachePolicies,    
      listCloudFrontOriginAccessIdentities, 
      listContinuousDeploymentPolicies, 
      listDistributions, 
      listFieldLevelEncryptionConfigs, 
      listFieldLevelEncryptionProfiles, 
      listFunctions, 
      listKeyGroups, 
      listKeyValueStores,
      listOriginAccessControls, 
      listOriginRequestPolicies, 
      listPublicKeys,
      listRealtimeLogConfigs,  
      listResponseHeadersPolicies, 
      listStreamingDistributions, 
  ]
  for (const func of functionsToExecute) {
      try {
        await func(); // Await the function call
      } catch (error) {
        console.error(`Error executing ${func.name}:`, error);
      //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
      }
    }
    saveAllOutputToFile('cloudfront.txt')
  }
  //main()

module.exports = { main };
