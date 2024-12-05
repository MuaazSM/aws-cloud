const { DatabaseMigrationServiceClient, DescribeEndpointsCommand, DescribeEndpointTypesCommand, DescribeEngineVersionsCommand, 
    DescribeFleetAdvisorCollectorsCommand, DescribeFleetAdvisorDatabasesCommand, DescribeFleetAdvisorSchemaObjectSummaryCommand,
    DescribeFleetAdvisorSchemasCommand,  DescribeInstanceProfilesCommand, DescribeMetadataModelAssessmentsCommand, DescribeReplicationTasksCommand,
    DescribeReplicationsCommand, 
 } = require("@aws-sdk/client-database-migration-service"); // CommonJS import
const config = require('./awsConfig'); // Your AWS config file
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

const client = new DatabaseMigrationServiceClient(config);

async function describeEndpoints(marker = null, maxRecords = null) {
    const input = {};

    const command = new DescribeEndpointsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Endpoints:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeEndpoints ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeEndpoints", error);    
    }
}

async function describeEndpointTypes() {
    const input = {};

    const command = new DescribeEndpointTypesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Endpoint Types:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeEndpointTypes ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeEndpointTypes", error);    
    }
}

async function describeEngineVersions() {
    const input = {};

    const command = new DescribeEngineVersionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Engine Versions:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeEngineVersions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeEngineVersions", error);    
    }
}

async function describeFleetAdvisorCollectors() {
    const input = {};

    const command = new DescribeFleetAdvisorCollectorsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Fleet Advisor Collectors:", JSON.stringify(response, null, 2)); 
        accumulatedOutput += `\n--- describeFleetAdvisorCollectors ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeFleetAdvisorCollectors", error);    
    }
}

async function describeFleetAdvisorDatabases() {
    const input = {};
    
    const command = new DescribeFleetAdvisorDatabasesCommand(input);
    
    try {
        const response = await client.send(command);
        console.log("Fleet Advisor Databases:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeFleetAdvisorDatabases ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeFleetAdvisorDatabases", error);        
    }
}

async function describeFleetAdvisorSchemaObjectSummary() {
    const input = {};
    
    const command = new DescribeFleetAdvisorSchemaObjectSummaryCommand(input);
    
    try {
        const response = await client.send(command);
        console.log("Fleet Advisor Schema Object Summary:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeFleetAdvisorSchemaObjectSummary ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeFleetAdvisorSchemaObjectSummary", error);        
    }
}

async function describeFleetAdvisorSchemas() {
    const input = {};
    
    const command = new DescribeFleetAdvisorSchemasCommand(input);
    
    try {
        const response = await client.send(command);
        console.log("Fleet Advisor Schemas:", JSON.stringify(response, null, 2));
        accumulatedOutput += `\n--- describeFleetAdvisorSchemas ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeFleetAdvisorSchemas", error);        
    }
}

async function describeInstanceProfiles() {
    const input = {};
    
    const command = new DescribeInstanceProfilesCommand(input);
    
    try {
        const response = await client.send(command);
        console.log("Instance Profiles:", JSON.stringify(response, null, 2));
        accumulatedOutput += `\n--- describeInstanceProfiles ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeInstanceProfiles", error);        
    }
}

async function describeMetadataModelAssessments() {
    const input = {};
    
    const command = new DescribeMetadataModelAssessmentsCommand(input);
    
    try {
        const response = await client.send(command);
        console.log("Metadata Model Assessments:", JSON.stringify(response, null, 2));
        accumulatedOutput += `\n--- describeMetadataModelAssessments ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeMetadataModelAssessments", error);        
    }
}

async function describeReplicationTasks() {
    const input = {};
    
    const command = new DescribeReplicationTasksCommand(input);
    
    try {
        const response = await client.send(command);
        console.log("Replication Tasks:", JSON.stringify(response, null, 2));
        accumulatedOutput += `\n--- describeReplicationTasks ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeReplicationTasks", error);        
    }
}

async function describeReplications() {
    const input = {}; // Empty input parameter
    
    const command = new DescribeReplicationsCommand(input);
    
    try {
        const response = await client.send(command);
        console.log("Replications:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeReplications ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: DatabaseMigrationService: DescribeReplications", error);        
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeEndpoints,    
        describeEndpointTypes, 
        describeEngineVersions,
        describeFleetAdvisorCollectors,  
        describeFleetAdvisorDatabases,
        describeFleetAdvisorSchemaObjectSummary,  
        describeFleetAdvisorSchemas, 
        describeMetadataModelAssessments, 
        describeReplications, 
        describeInstanceProfiles,
        describeReplicationTasks
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('database-migration-service.txt')
}

//  main()  

module.exports = { main };
