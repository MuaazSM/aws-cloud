const { ImagebuilderClient, ListContainerRecipesCommand, ListDistributionConfigurationsCommand, ListImagePipelinesCommand,
    ListImageRecipesCommand, ListImageScanFindingsCommand, ListImagesCommand, ListInfrastructureConfigurationsCommand,
    ListLifecyclePoliciesCommand, 
} = require("@aws-sdk/client-imagebuilder"); // CommonJS import

const config = require('./awsConfig');
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';
const client = new ImagebuilderClient(config);

async function listContainerRecipes() {
    const input = {}; // Empty input object

    const command = new ListContainerRecipesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Container Recipes:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listContainerRecipes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Imagebuilder: List Container Recipes", error);
    }
}

async function listDistributionConfigurations() {
    const input = {}; // Empty input object

    const command = new ListDistributionConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Distribution Configurations:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDistributionConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Imagebuilder: List Distribution Configurations", error);
    }
}

async function listImagePipelines() {
    const input = {}; // Empty input object

    const command = new ListImagePipelinesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Image Pipelines:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listImagePipelines ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Imagebuilder: List Image Pipelines", error);
    }
}

async function listImageRecipes() {
    const input = {}; // Empty input object

    const command = new ListImageRecipesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Image Recipes:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listImageRecipes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Imagebuilder: List Image Recipes", error);
    }
}

async function listImageScanFindings() {
    const input = {}; // Empty input object

    const command = new ListImageScanFindingsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Image Scan Findings:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listImageScanFindings ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Imagebuilder: List Image Scan Findings", error);
    }
}

async function listImages() {
    const input = {}; // Empty input object

    const command = new ListImagesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Images:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listImages ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Imagebuilder: List Images", error);
    }
}

async function listInfrastructureConfigurations() {
    const input = {}; // Empty input object

    const command = new ListInfrastructureConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Infrastructure Configurations:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listInfrastructureConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Imagebuilder: List Infrastructure Configurations", error);
    }
}

async function listLifecyclePolicies() {
    const input = {}; // Empty input object

    const command = new ListLifecyclePoliciesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Lifecycle Policies:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listLifecyclePolicies ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Imagebuilder: List Lifecycle Policies", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listContainerRecipes,    
        listDistributionConfigurations, 
        listImagePipelines, 
        listImageRecipes, 
        listImageScanFindings, 
        listImages, 
        listInfrastructureConfigurations,  
        listLifecyclePolicies, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        }
    }
    saveAllOutputToFile('imagebuilder.txt')
}

//  main();


module.exports = { main };
