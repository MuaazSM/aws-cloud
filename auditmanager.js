const { AuditManagerClient, GetAccountStatusCommand, GetDelegationsCommand, GetInsightsCommand, GetServicesInScopeCommand, 
    GetSettingsCommand, ListAssessmentsCommand, ListControlDomainInsightsCommand, ListNotificationsCommand, 
 } = require("@aws-sdk/client-auditmanager"); // CommonJS import
 const logger = require('./logger')
 const fs = require('fs'); 
 let accumulatedOutput = '';
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new AuditManagerClient(config);

async function getAccountStatus() {
    const input = {}; // No input parameters are required for this command

    const command = new GetAccountStatusCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getAccountStatus ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AuditManager: GetAccountStatus", error);
    }
}

async function getDelegations() {
    const input = {}; 

    const command = new GetDelegationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getDelegations ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AuditManager: GetDelegations", error);
    }
}

async function getInsights() {
    const input = {}; // No parameters are required for this request

    const command = new GetInsightsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getInsights ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AuditManager: GetInsights", error);
    }
}

async function getServicesInScope() {
    const input = {}; // No parameters are required for this request

    const command = new GetServicesInScopeCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getServicesInScope ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AuditManager: GetServicesInScope", error);
    }
}

async function getSettings() {
    const input = { // GetSettingsRequest
        attribute: "ALL", // required, can be "ALL", "IS_AWS_ORG_ENABLED", etc.
    };

    const command = new GetSettingsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getSettings ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AuditManager: GetSettings", error);
    }
}

async function listAssessments() {
    const input = { // ListAssessmentsRequest
        status: "ACTIVE", // required: can be "ACTIVE" or "INACTIVE"
    };

    const command = new ListAssessmentsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listAssessments ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AuditManager: ListAssessments", error);
    }
}

async function listControlDomainInsights() {
    const input = { // ListControlDomainInsightsRequest
    };

    const command = new ListControlDomainInsightsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listControlDomainInsights ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AuditManager: ListControlDomainInsights", error);
    }
}

async function listNotifications() {
    const input = {};

    const command = new ListNotificationsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listNotifications ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: AuditManager: ListNotifications", error);
    }
}
function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        getAccountStatus,    
        getDelegations, 
        getInsights,
        getServicesInScope, 
        getSettings, 
        listAssessments,  
        listControlDomainInsights, 
        listNotifications, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`); // Commented out for now
        }
    }
    saveAllOutputToFile('auditmanager.txt')
}

//  main() 

module.exports = { main };
