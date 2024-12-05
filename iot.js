const { IoTClient, DescribeAccountAuditConfigurationCommand, DescribeDefaultAuthorizerCommand, ListAuthorizersCommand,
    ListBillingGroupsCommand, ListCACertificatesCommand, ListCertificateProvidersCommand, ListCertificatesCommand, ListDimensionsCommand,
    ListFleetMetricsCommand, ListOutgoingCertificatesCommand, ListPoliciesCommand, ListRoleAliasesCommand, ListScheduledAuditsCommand,
    ListStreamsCommand, ListTopicRuleDestinationsCommand, 
 } = require("@aws-sdk/client-iot"); // CommonJS import
 const config = require('./awsConfig');
 const client = new IoTClient(config);
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeAccountAuditConfiguration() {
    const input = {}; // Empty input object

    const command = new DescribeAccountAuditConfigurationCommand(input);

    try {
        const response = await client.send(command);
        console.log("Account Audit Configuration:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeAccountAuditConfiguration ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: Describe Account Audit Configuration", error);    
    }
}

async function describeDefaultAuthorizer() {
    const input = {}; // Empty input object

    const command = new DescribeDefaultAuthorizerCommand(input);

    try {
        const response = await client.send(command);
        console.log("Default Authorizer:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- describeDefaultAuthorizer ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: Describe Default Authorizer", error);    
    }
}

async function listAuthorizers() {
    const input = {};

    const command = new ListAuthorizersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Authorizers List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listAuthorizers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Authorizers", error);    
    }
}

async function listBillingGroups() {
    const input = {}; // Empty input object

    const command = new ListBillingGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Billing Groups List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listBillingGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Billing Groups", error);    
    }
}

async function listCACertificates() {
    const input = {}; // Empty input object

    const command = new ListCACertificatesCommand(input);

    try {
        const response = await client.send(command);
        console.log("CA Certificates List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCACertificates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List CA Certificates", error);    
    }
}

async function listCertificateProviders() {
    const input = {}; // Empty input object

    const command = new ListCertificateProvidersCommand(input);

    try {
        const response = await client.send(command);
        console.log("Certificate Providers List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCertificateProviders ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Certificate Providers", error);    
    }
}

async function listCertificates() {
    const input = {}; // Empty input object

    const command = new ListCertificatesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Certificates List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listCertificates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Certificates", error);    
    }
}

async function listDimensions() {
    const input = {}; // Empty input object

    const command = new ListDimensionsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Dimensions List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listDimensions ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Dimensions", error);    
    }
}

async function listFleetMetrics() {
    const input = {}; // Empty input object

    const command = new ListFleetMetricsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Fleet Metrics List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listFleetMetrics ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Fleet Metrics", error);    
    }
}

async function listOutgoingCertificates() {
    const input = {}; // Empty input object

    const command = new ListOutgoingCertificatesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Outgoing Certificates List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listOutgoingCertificates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Outgoing Certificates", error);    
    }
}

async function listPolicies() {
    const input = {}; 

    const command = new ListPoliciesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Policies List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listPolicies ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Policies", error);    
    }
}

async function listRoleAliases() {
    const input = {}; 

    const command = new ListRoleAliasesCommand(input);

    try {
        const response = await client.send(command);
        console.log("Role Aliases List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listRoleAliases ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Role Aliases", error);    
    }
}

async function listScheduledAudits() {
    const input = {}; 

    const command = new ListScheduledAuditsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Scheduled Audits List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listScheduledAudits ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Scheduled Audits", error);    
    }
}

async function listStreams() {
    const input = {}; 

    const command = new ListStreamsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Streams List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listStreams ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Streams", error);    
    }
}

async function listTopicRuleDestinations() {
    const input = {}; 

    const command = new ListTopicRuleDestinationsCommand(input);

    try {
        const response = await client.send(command);
        console.log("Topic Rule Destinations List:", JSON.stringify(response, null, 2)); // Log the response
        accumulatedOutput += `\n--- listTopicRuleDestinations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IoT: List Topic Rule Destinations", error);    
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        describeAccountAuditConfiguration,    
        describeDefaultAuthorizer,
        listAuthorizers, 
        listBillingGroups, 
        listCACertificates,
        listCertificateProviders,   
        listCertificates, 
        listDimensions, 
        listFleetMetrics, 
        listOutgoingCertificates, 
        listPolicies, 
        listRoleAliases, 
        listScheduledAudits,
        listStreams, 
        listTopicRuleDestinations, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
    }
    saveAllOutputToFile('iot.txt')
}

//  main();

module.exports = { main };
