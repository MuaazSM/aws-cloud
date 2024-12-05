const { IAMClient, GenerateCredentialReportCommand, GetAccountAuthorizationDetailsCommand, GetAccountPasswordPolicyCommand,
    GetAccountSummaryCommand, GetCredentialReportCommand, ListAccessKeysCommand, ListAccountAliasesCommand, ListGroupsCommand, 
    ListMFADevicesCommand, ListOpenIDConnectProvidersCommand, ListPoliciesCommand, ListRolesCommand, ListSAMLProvidersCommand,
    ListSSHPublicKeysCommand, ListServerCertificatesCommand, ListServiceSpecificCredentialsCommand, ListSigningCertificatesCommand, 
    ListUsersCommand, ListVirtualMFADevicesCommand,
 } = require("@aws-sdk/client-iam");

const config = require("./awsConfig");
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';


const client = new IAMClient(config);

async function generateCredentialReport() {
    const input = {};
    const command = new GenerateCredentialReportCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2));
        accumulatedOutput += `\n--- generateCredentialReport ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
        logger.error("Error: IAM: Generate Credential Report", error);
    }
}

async function getAccountAuthorizationDetails() {
    const input = {}; // No required parameters for this command

    const command = new GetAccountAuthorizationDetailsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getAccountAuthorizationDetails ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: Get Account Authorization Details", error);
    }
}

async function getAccountPasswordPolicy() {
    const input = {}; // No required parameters for this command

    const command = new GetAccountPasswordPolicyCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getAccountPasswordPolicy ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: Get Account Password Policy", error);
    }
}

async function getAccountSummary() {
    const input = {}; // No required parameters for this command

    const command = new GetAccountSummaryCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getAccountSummary ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: Get Account Summary", error);
    }
}

async function getCredentialReport() {
    const input = {}; // No required parameters for this command

    const command = new GetCredentialReportCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- getCredentialReport ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: Get Credential Report", error);
    }
}

async function listAccessKeys() {
    const input = {};

    const command = new ListAccessKeysCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listAccessKeys ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Access Keys", error);
    }
}

async function listAccountAliases() {
    const input = {}

    const command = new ListAccountAliasesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listAccountAliases ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Account Aliases", error);
    }
}

async function listGroups() {
    const input = {}; // No specific input parameters

    const command = new ListGroupsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listGroups ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Groups", error);
    }
}

async function listMFADevices() {
    const input = {}; // No specific input parameters

    const command = new ListMFADevicesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listMFADevices ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List MFA Devices", error);
    }
}

async function listOpenIDConnectProviders() {
    const input = {}; // No specific input parameters

    const command = new ListOpenIDConnectProvidersCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listOpenIDConnectProviders ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List OpenID Connect Providers", error);
    }
}

async function listPolicies() {
    const input = {}; // No specific input parameters

    const command = new ListPoliciesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listPolicies ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Policies", error);
    }
}

async function listRoles() {
    const input = {}; // No specific inputs

    const command = new ListRolesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listRoles ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Roles", error);
    }
}

async function listSAMLProviders() {
    const input = {}; // No specific inputs

    const command = new ListSAMLProvidersCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listSAMLProviders ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List SAML Providers", error);
    }
}

async function listSSHPublicKeys() {
    const input = {}; // No specific inputs

    const command = new ListSSHPublicKeysCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listSSHPublicKeys ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List SSH Public Keys", error);
    }
}

async function listServerCertificates() {
    const input = {}; // No specific inputs

    const command = new ListServerCertificatesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listServerCertificates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Server Certificates", error);
    }
}

async function listServiceSpecificCredentials() {
    const input = {}; // No specific inputs

    const command = new ListServiceSpecificCredentialsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listServiceSpecificCredentials ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Service Specific Credentials", error);
    }
}

async function listSigningCertificates() {
    const input = {}; // No specific inputs

    const command = new ListSigningCertificatesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listSigningCertificates ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Signing Certificates", error);
    }
}

async function listUsers() {
    const input = {}; // No specific inputs

    const command = new ListUsersCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listUsers ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Users", error);
    }
}

async function listVirtualMFADevices() {
    const input = {}; // No specific inputs

    const command = new ListVirtualMFADevicesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listVirtualMFADevices ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: IAM: List Virtual MFA Devices", error);
    }
}

function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        generateCredentialReport,
        getAccountAuthorizationDetails,
        getAccountPasswordPolicy,
        getAccountSummary,
        getCredentialReport, 
        listAccessKeys,
        listAccountAliases, 
        listGroups,
        listMFADevices, 
        listOpenIDConnectProviders,
        listPolicies, 
        listRoles, 
        listSAMLProviders,
        listSSHPublicKeys,
        listServerCertificates,
        listServiceSpecificCredentials,
        listSigningCertificates,
        listUsers,
        listVirtualMFADevices,
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        }
    }
    saveAllOutputToFile('iam.txt')

}

//  main();


module.exports = { main };
