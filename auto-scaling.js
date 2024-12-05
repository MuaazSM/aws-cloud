const { AutoScalingClient, DescribeAccountLimitsCommand, DescribeAdjustmentTypesCommand, DescribeAutoScalingGroupsCommand, 
    DescribeAutoScalingInstancesCommand, DescribeAutoScalingNotificationTypesCommand, DescribeLaunchConfigurationsCommand, 
    DescribeLifecycleHookTypesCommand, DescribeMetricCollectionTypesCommand, DescribePoliciesCommand, DescribeScalingActivitiesCommand, 
    DescribeScalingProcessTypesCommand, DescribeTagsCommand, DescribeTerminationPolicyTypesCommand, 
  } = require("@aws-sdk/client-auto-scaling"); // CommonJS import
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AutoScalingClient(config);

async function describeAccountLimits() {
    const input = {}; // No parameters are required for this command

    const command = new DescribeAccountLimitsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeAccountLimits ---\n${JSON.stringify(response, null, 2)}\n`;
    } catch (error) {
         logger.error("Error: AutoScaling: Describe Account Limits", error);
    }
}

async function describeAdjustmentTypes() {
    const input = {}; // No parameters are required for this command

    const command = new DescribeAdjustmentTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeAdjustmentTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Adjustment Types", error);
    }
}

async function describeAutoScalingGroups() {
    const input = { 
    };

    const command = new DescribeAutoScalingGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeAutoScalingGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Auto Scaling Groups", error);
    }
}

async function describeAutoScalingInstances() {
    const input = {};

    const command = new DescribeAutoScalingInstancesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeAutoScalingInstances ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Auto Scaling Instances", error);
    }
}

async function describeAutoScalingNotificationTypes() {
    const input = {}; // No parameters required for this command

    const command = new DescribeAutoScalingNotificationTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeAutoScalingNotificationTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Auto Scaling Notification Types", error);
    }
}

async function describeLaunchConfigurations() {
    const input = {};

    const command = new DescribeLaunchConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeLaunchConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Launch Configurations", error);
    }
}

async function describeLifecycleHookTypes() {
    const input = {}; // No parameters needed for this command

    const command = new DescribeLifecycleHookTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeLifecycleHookTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Lifecycle Hook Types", error);
    }
}

async function describeMetricCollectionTypes() {
    const input = {}; // No parameters needed for this command

    const command = new DescribeMetricCollectionTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeMetricCollectionTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Metric Collection Types", error);
    }
}

async function describePolicies() {
    const input = {}; // No parameters are required for this command

    const command = new DescribePoliciesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describePolicies ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Policies", error);
    }
}

async function describeScalingActivities() {
    const input = {}; // No parameters are required for this command

    const command = new DescribeScalingActivitiesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeScalingActivities ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Scaling Activities", error);
    }
}

async function describeScalingProcessTypes() {
    const input = {}; // No parameters are required for this command

    const command = new DescribeScalingProcessTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeScalingProcessTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Scaling Process Types", error);
    }
}

async function describeTags() {
    const input = {}; // No parameters provided, retrieves all tags

    const command = new DescribeTagsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeTags ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Tags", error);
    }
}

async function describeTerminationPolicyTypes() {
    const input = {}; // No parameters are required for this command

    const command = new DescribeTerminationPolicyTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeTerminationPolicyTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AutoScaling: Describe Termination Policy Types", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        describeAccountLimits,    
        describeAdjustmentTypes, 
        describeAutoScalingGroups, 
        describeAutoScalingInstances, 
        describeAutoScalingNotificationTypes, 
        describeLaunchConfigurations, 
        describeLifecycleHookTypes, 
        describeMetricCollectionTypes,
        describePolicies, 
        describeScalingActivities,  
        describeScalingProcessTypes, 
        describeTags, 
        describeTerminationPolicyTypes, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        }
      }
      saveAllOutputToFile('auto-scaling.txt')
    }
 main() 
module.exports = { main };
