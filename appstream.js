const { AppStreamClient, DescribeAppBlockBuilderAppBlockAssociationsCommand, DescribeAppBlockBuildersCommand,
    DescribeAppBlocksCommand, DescribeApplicationFleetAssociationsCommand, DescribeApplicationsCommand, DescribeDirectoryConfigsCommand,
    DescribeEntitlementsCommand, DescribeFleetsCommand, DescribeImageBuildersCommand, DescribeImagesCommand, DescribeStacksCommand,
    DescribeUsageReportSubscriptionsCommand, DescribeUserStackAssociationsCommand, 
  } = require("@aws-sdk/client-appstream"); // CommonJS import
  const logger = require('./logger')
  const fs = require('fs'); 
  let accumulatedOutput = '';
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AppStreamClient(config);

async function describeAppBlockBuilderAppBlockAssociations() {
    const input = {
       
    };

    const command = new DescribeAppBlockBuilderAppBlockAssociationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeAppBlockBuilderAppBlockAssociations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeAppBlockBuilderAppBlockAssociations", error);
    }
}

async function describeAppBlockBuilders() {
    const input = {
    };

    const command = new DescribeAppBlockBuildersCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeAppBlockBuilders ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeAppBlockBuilders", error);
    }
}

async function describeAppBlocks() {
    const input = {
    };

    const command = new DescribeAppBlocksCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeAppBlocks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeAppBlocks", error);
    }
}

async function describeApplicationFleetAssociations() {
    const input = {}; // No parameters needed

    const command = new DescribeApplicationFleetAssociationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeApplicationFleetAssociations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeApplicationFleetAssociations", error);
    }
}

async function describeApplications() {
    const input = {}; // No parameters needed

    const command = new DescribeApplicationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeApplications ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeApplications", error);
    }
}

async function describeDirectoryConfigs() {
    const input = {}; // No parameters needed

    const command = new DescribeDirectoryConfigsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeDirectoryConfigs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeDirectoryConfigs", error);
    }
}

async function describeEntitlements() {
    const input = {
    };

    const command = new DescribeEntitlementsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeEntitlements ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeEntitlements", error);
    }
}

async function describeFleets() {
    const input = {}; // No parameters needed

    const command = new DescribeFleetsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeFleets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeFleets", error);
    }
}

async function describeImageBuilders() {
    const input = {}; // No parameters needed

    const command = new DescribeImageBuildersCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeImageBuilders ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeImageBuilders", error);
    }
}

async function describeImages() {
    const input = {
    };

    const command = new DescribeImagesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeImages ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeImages", error);
    }
}

async function describeStacks() {
    const input = {
    };

    const command = new DescribeStacksCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeStacks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeStacks", error);
    }
}

async function describeUsageReportSubscriptions() {
    const input = {
    };

    const command = new DescribeUsageReportSubscriptionsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeUsageReportSubscriptions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeUsageReportSubscriptions", error);
    }
}

async function describeUserStackAssociations() {
    const input = {
    };

    const command = new DescribeUserStackAssociationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- describeUserStackAssociations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AppStream: DescribeUserStackAssociations", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        describeAppBlockBuilderAppBlockAssociations,    
        describeAppBlockBuilders, 
        describeAppBlocks, 
        describeApplicationFleetAssociations, 
        describeApplications, 
        describeDirectoryConfigs, 
        describeEntitlements, 
        describeFleets, 
        describeImageBuilders, 
        describeImages, 
        describeStacks, 
        describeUsageReportSubscriptions, 
        describeUserStackAssociations, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`); // Commented out for now
        }
    }
    saveAllOutputToFile('appstream.txt')
}

//  main() 

module.exports = { main };
