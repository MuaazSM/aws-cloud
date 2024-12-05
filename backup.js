const { BackupClient, DescribeGlobalSettingsCommand, DescribeRegionSettingsCommand, ListBackupJobSummariesCommand,
    ListBackupJobsCommand, ListBackupPlanTemplatesCommand, ListBackupPlansCommand, ListBackupVaultsCommand, ListCopyJobSummariesCommand, 
    ListCopyJobsCommand, ListFrameworksCommand, ListLegalHoldsCommand, ListProtectedResourcesCommand, ListRecoveryPointsByBackupVaultCommand, 
    ListReportJobsCommand, ListReportPlansCommand, ListRestoreJobSummariesCommand, ListRestoreJobsCommand, ListRestoreTestingPlansCommand, 
} = require("@aws-sdk/client-backup"); // CommonJS import
const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new BackupClient(config);
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

async function describeGlobalSettings() {
const input = {}; // No parameters are required for this command

const command = new DescribeGlobalSettingsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- describeGlobalSettings ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: Describe Global Settings", error);
}
}

async function describeRegionSettings() {
const input = {}; // No parameters are required for this command

const command = new DescribeRegionSettingsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- describeRegionSettings ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: Describe Region Settings", error);
}
}

async function listBackupJobSummaries() {
const input = {}; // No parameters are required for this command

const command = new ListBackupJobSummariesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listBackupJobSummaries ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Backup Job Summaries", error);
}
}

async function listBackupJobs() {
const input = {}; // No parameters are required for this command

const command = new ListBackupJobsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listBackupJobs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Backup Jobs", error);
}
}

async function listBackupPlanTemplates() {
const input = {}; // No parameters are required for this command

const command = new ListBackupPlanTemplatesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listBackupPlanTemplates ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Backup Plan Templates", error);
}
}

async function listBackupPlans() {
const input = {}; // No parameters are required for this command

const command = new ListBackupPlansCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listBackupPlans ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Backup Plans", error);
}
}

async function listBackupVaults() {
const input = {}; // No parameters are required for this command

const command = new ListBackupVaultsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listBackupVaults ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Backup Vaults", error);
}
}

async function listCopyJobSummaries() {
const input = {}; // No parameters are required for this command

const command = new ListCopyJobSummariesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listCopyJobSummaries ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Copy Job Summaries", error);
}
}

async function listCopyJobs() {
const input = {}; // No parameters are required for this command

const command = new ListCopyJobsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listCopyJobs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Copy Jobs", error);
}
}

async function listFrameworks() {
const input = {}; // No parameters are required for this command

const command = new ListFrameworksCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listFrameworks ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Frameworks", error);
}
}

async function listLegalHolds() {
const input = {}; // No parameters are required for this command

const command = new ListLegalHoldsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listLegalHolds ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Legal Holds", error);
}
}

async function listProtectedResources() {
const input = {}; // No parameters are required for this command

const command = new ListProtectedResourcesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listProtectedResources ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Protected Resources", error);
}
}


async function listReportJobs() {
const input = {}; // No parameters needed

const command = new ListReportJobsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listReportJobs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Report Jobs", error);
}
}

async function listReportPlans() {
const input = { // ListReportPlansInput
};

const command = new ListReportPlansCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listReportPlans ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Report Plans", error);
}
}

async function listRestoreJobSummaries() {
const input = {}; // No parameters are required for this command
const command = new ListRestoreJobSummariesCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listRestoreJobSummaries ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Restore Job Summaries", error);
}
}

async function listRestoreJobs() {
const input = {}; // No parameters are required for this command
const command = new ListRestoreJobsCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listRestoreJobs ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Restore Jobs", error);
}
}

async function listRestoreTestingPlans() {
const input = {}; // No parameters are required for this command
const command = new ListRestoreTestingPlansCommand(input);

try {
    const response = await client.send(command);
    console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
    accumulatedOutput += `\n--- listRestoreTestingPlans ---\n${JSON.stringify(response, null, 2)}\n`;

} catch (error) {
     logger.error("Error: Backup: List Restore Testing Plans", error);
}
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
}

async function main() {
const functionsToExecute = [
    describeGlobalSettings,    
    describeRegionSettings,
    listBackupJobSummaries,  
    listBackupJobs,
    listBackupPlanTemplates, 
    listBackupPlans,  
    listBackupVaults, 
    listCopyJobSummaries,
    listCopyJobs,  
    listFrameworks, 
    listLegalHolds, 
    listProtectedResources,  
    listReportJobs, 
    listReportPlans, 
    listRestoreJobSummaries, 
    listRestoreJobs, 
    listRestoreTestingPlans, 
]
for (const func of functionsToExecute) {
    try {
      await func(); // Await the function call
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
    //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`); 
    }
}saveAllOutputToFile('backup.txt')
}

//  main() 

module.exports = { main };
