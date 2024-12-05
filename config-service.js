const { ConfigServiceClient, DescribeAggregationAuthorizationsCommand, DescribeComplianceByConfigRuleCommand, 
    DescribeConfigRuleEvaluationStatusCommand, DescribePendingAggregationRequestsCommand, GetComplianceSummaryByConfigRuleCommand, 
    GetComplianceSummaryByResourceTypeCommand, ListResourceEvaluationsCommand, ListStoredQueriesCommand, 
} = require("@aws-sdk/client-config-service"); // CommonJS import
const config = require('./awsConfig');
const client = new ConfigServiceClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeAggregationAuthorizations() {
    const input = {};

    const command = new DescribeAggregationAuthorizationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Aggregation Authorizations:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeAggregationAuthorizations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ConfigService: DescribeAggregationAuthorizations", error);    
    }
}

async function describeComplianceByConfigRule() {
    const input = {};

    const command = new DescribeComplianceByConfigRuleCommand(input);

    try {
        const response = await client.send(command);
        console.log("Compliance by Config Rule:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeComplianceByConfigRule ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ConfigService: DescribeComplianceByConfigRule", error);    
    }
}

async function describeConfigRuleEvaluationStatus() {
    const input = {};

    const command = new DescribeConfigRuleEvaluationStatusCommand(input);

    try {
        const response = await client.send(command);
        console.log("Config Rule Evaluation Status:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- describeConfigRuleEvaluationStatus ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ConfigService: DescribeConfigRuleEvaluationStatus", error);    
    }
}

async function describePendingAggregationRequests() {
    const input = {};
  
    const command = new DescribePendingAggregationRequestsCommand(input);
    
    try {
      const response = await client.send(command);
      console.log("Pending Aggregation Requests:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- describePendingAggregationRequests ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ConfigService: DescribePendingAggregationRequests", error);    
    }
}

async function getComplianceSummaryByConfigRule() {
    const input = {}; // No required parameters for this command

    const command = new GetComplianceSummaryByConfigRuleCommand(input);

    try {
        const response = await client.send(command);
        console.log("Compliance Summary:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- getComplianceSummaryByConfigRule ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ConfigService: GetComplianceSummaryByConfigRule", error);    
    }
}

async function getComplianceSummaryByResourceType() {
    const input = {};

    const command = new GetComplianceSummaryByResourceTypeCommand(input);

    try {
        const response = await client.send(command);
        console.log("Compliance Summary by Resource Type:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- getComplianceSummaryByResourceType ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ConfigService: GetComplianceSummaryByResourceType", error);    
    }
}

async function listResourceEvaluations() {
    const input = {}; // Empty input to fetch all evaluations

    const command = new ListResourceEvaluationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Resource Evaluations:", JSON.stringify(response, null, 2)); // Pretty print the response
        accumulatedOutput += `\n--- listResourceEvaluations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: ConfigService: ListResourceEvaluations", error);    
    }
}

async function listStoredQueries() {
    const input = {};

    const command = new ListStoredQueriesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Stored Queries:", JSON.stringify(response, null, 2));
        accumulatedOutput += `\n--- listStoredQueries ---\n${JSON.stringify(response, null, 2)}\n`;
 
    } catch (error) {
        logger.error("Error: ConfigService: ListStoredQueries", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeAggregationAuthorizations,    
        describeComplianceByConfigRule, 
        describeConfigRuleEvaluationStatus, 
        describePendingAggregationRequests,
        getComplianceSummaryByConfigRule, 
        getComplianceSummaryByResourceType, 
        listResourceEvaluations, 
        listStoredQueries, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('config-service.txt')
    }
//    main()

module.exports = { main };
