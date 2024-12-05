const { DocDBClient, DescribeCertificatesCommand, DescribeDBClusterParameterGroupsCommand, DescribeDBClusterSnapshotsCommand,
    DescribeDBClustersCommand, DescribeDBEngineVersionsCommand, DescribeDBInstancesCommand, DescribeDBSubnetGroupsCommand } = require("@aws-sdk/client-docdb"); // CommonJS import

const config = require('./awsConfig'); // Your AWS config file
const client = new DocDBClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeCertificates() {
    const input = {}; // Empty input parameter

    const command = new DescribeCertificatesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Certificates:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeCertificates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DocDB: DescribeCertificates", error);    
    }
}

async function describeDBClusterParameterGroups() {
    const input = {}; // Empty input parameter

    const command = new DescribeDBClusterParameterGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("DB Cluster Parameter Groups:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeDBClusterParameterGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DocDB: DescribeDBClusterParameterGroups", error);    
    }
}

async function describeDBClusterSnapshots() {
    const input = {}; // Empty input parameter

    const command = new DescribeDBClusterSnapshotsCommand(input);

    try {
        const response = await client.send(command);
        console.log("DB Cluster Snapshots:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeDBClusterSnapshots ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DocDB: DescribeDBClusterSnapshots", error);    
    }
}

async function describeDBClusters() {
    const input = {}; // Empty input parameter

    const command = new DescribeDBClustersCommand(input);

    try {
        const response = await client.send(command);
        console.log("DB Clusters:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeDBClusters ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DocDB: DescribeDBClusters", error);    
    }
}

async function describeDBEngineVersions() {
    const input = {}; // Empty input parameter

    const command = new DescribeDBEngineVersionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("DB Engine Versions:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeDBEngineVersions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DocDB: DescribeDBEngineVersions", error);    
    }
}

async function describeDBInstances() {
    const input = {}; // Empty input parameter

    const command = new DescribeDBInstancesCommand(input);

    try {
        const response = await client.send(command);
        console.log("DB Instances:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeDBInstances ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DocDB: DescribeDBInstances", error);    
    }
}

async function describeDBSubnetGroups() {
    const input = {}; // Empty input parameter for retrieving all subnet groups

    const command = new DescribeDBSubnetGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("DB Subnet Groups:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeDBSubnetGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DocDB: DescribeDBSubnetGroups", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        describeCertificates,    
        describeDBClusterParameterGroups, 
        describeDBClusterSnapshots,
        describeDBClusters, 
        describeDBEngineVersions, 
        describeDBInstances, 
        describeDBSubnetGroups, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('docdb.txt')

}

//  main() 

module.exports = { main };
