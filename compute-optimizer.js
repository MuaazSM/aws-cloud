const { ComputeOptimizerClient, GetAutoScalingGroupRecommendationsCommand, GetEBSVolumeRecommendationsCommand, GetEC2InstanceRecommendationsCommand,
  GetEC2RecommendationProjectedMetricsCommand, GetEnrollmentStatusCommand, GetEnrollmentStatusesForOrganizationCommand, GetLambdaFunctionRecommendationsCommand,
  GetRecommendationPreferencesCommand, GetRecommendationSummariesCommand, 
} = require("@aws-sdk/client-compute-optimizer"); // CommonJS import
const config = require('./awsConfig')
const client = new ComputeOptimizerClient(config); // Initialize client outside the function
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function getAutoScalingGroupRecommendations() {
const input = {};

const command = new GetAutoScalingGroupRecommendationsCommand(input);

try {
  const response = await client.send(command);
  console.log("Auto Scaling Group Recommendations:", JSON.stringify(response, null, 2)); // Pretty print the response
  accumulatedOutput += `\n--- getAutoScalingGroupRecommendations ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
  logger.error("Error: ComputeOptimizer: GetAutoScalingGroupRecommendations", error);
}
}

async function getEBSVolumeRecommendations() {
  const input = {};

  const command = new GetEBSVolumeRecommendationsCommand(input);

  try {
    const response = await client.send(command);
    console.log("EBS Volume Recommendations:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- getEBSVolumeRecommendations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ComputeOptimizer: GetEBSVolumeRecommendations", error);
  }
}

async function getEC2InstanceRecommendations() {
  const input = {};

  const command = new GetEC2InstanceRecommendationsCommand(input);

  try {
    const response = await client.send(command);
    console.log("EC2 Instance Recommendations:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- getEC2InstanceRecommendations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ComputeOptimizer: GetEC2InstanceRecommendations", error);
  }
}

async function getEC2RecommendationProjectedMetrics() {
  const input = {};

  const command = new GetEC2RecommendationProjectedMetricsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Projected Metrics for EC2 Recommendation:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- getEC2RecommendationProjectedMetrics ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ComputeOptimizer: GetEC2RecommendationProjectedMetrics", error);
  }
}

async function getEnrollmentStatus() {
  const input = {}; // No parameters needed for this command
  const command = new GetEnrollmentStatusCommand(input);

  try {
      const response = await client.send(command);
      console.log("Enrollment Status:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- getEnrollmentStatus ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ComputeOptimizer: GetEnrollmentStatus", error);
  }
}

async function getEnrollmentStatusesForOrganization() {
  const input = {};

  const command = new GetEnrollmentStatusesForOrganizationCommand(input);

  try {
      const response = await client.send(command);
      console.log("Enrollment Statuses:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- getEnrollmentStatusesForOrganization ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ComputeOptimizer: GetEnrollmentStatusesForOrganization", error);
  }
}

async function getLambdaFunctionRecommendations() {
  const input = {};

  const command = new GetLambdaFunctionRecommendationsCommand(input);

  try {
      const response = await client.send(command);
      console.log("Lambda Function Recommendations:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- getLambdaFunctionRecommendations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ComputeOptimizer: GetLambdaFunctionRecommendations", error);
  }
}

async function getRecommendationPreferences() {
  const input = {};

  const command = new GetRecommendationPreferencesCommand(input);

  try {
      const response = await client.send(command);
      console.log("Recommendation Preferences:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- getRecommendationPreferences ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ComputeOptimizer: GetRecommendationPreferences", error);
  }
}

async function getRecommendationSummaries() {
  const input = {};

  const command = new GetRecommendationSummariesCommand(input);

  try {
      const response = await client.send(command);
      console.log("Recommendation Summaries:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- getRecommendationSummaries ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: ComputeOptimizer: GetRecommendationSummaries", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
  const functionsToExecute = [
      getAutoScalingGroupRecommendations,    
      getEBSVolumeRecommendations,
      getEC2InstanceRecommendations,  
      getEC2RecommendationProjectedMetrics, 
      getEnrollmentStatus, 
      getEnrollmentStatusesForOrganization,
      getLambdaFunctionRecommendations, 
      getRecommendationPreferences,  
      getRecommendationSummaries, 
  ]
  for (const func of functionsToExecute) {
      try {
        await func(); // Await the function call
      } catch (error) {
        console.error(`Error executing ${func.name}:`, error);
      //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
      }
    }
    saveAllOutputToFile('compute-optimizer.txt')

  }
   main()

module.exports = { main };
