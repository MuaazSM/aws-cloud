const { KafkaClient, ListClustersCommand, ListClustersV2Command, ListConfigurationsCommand, ListKafkaVersionsCommand,
    ListReplicatorsCommand, ListVpcConnectionsCommand 
} = require("@aws-sdk/client-kafka"); // CommonJS import
const config = require('./awsConfig');
const client = new KafkaClient(config); // Initialize the Kafka client
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function listClusters() {
    const input = {}; 

    const command = new ListClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Clusters List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Kafka: List Clusters", error);    
    }
}

async function listClustersV2() {
    const input = {}; 

    const command = new ListClustersV2Command(input);

    try {
        const response = await client.send(command);
        console.log("Clusters V2 List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listClustersV2 ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Kafka: List Clusters V2", error);    
    }
}

async function listConfigurations() {
    const input = {}; 

    const command = new ListConfigurationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Configurations List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Kafka: List Configurations", error);    
    }
}

async function listKafkaVersions() {
    const input = {}; 

    const command = new ListKafkaVersionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Kafka Versions List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listKafkaVersions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Kafka: List Kafka Versions", error);    
    }
}

async function listReplicators() {
    const input = {}; 

    const command = new ListReplicatorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Replicators List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listReplicators ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Kafka: List Replicators", error);    
    }
}

async function listVpcConnections() {
    const input = {}; 

    const command = new ListVpcConnectionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("VPC Connections List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listVpcConnections ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: Kafka: List VPC Connections", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listClusters,    
        listClustersV2, 
        listConfigurations, 
        listKafkaVersions, 
        listReplicators, 
        listVpcConnections
    ];
    
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('kafka.txt')
}

//  main();

module.exports = { main };
