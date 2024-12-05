const { CodeCommitClient, ListApprovalRuleTemplatesCommand } = require("@aws-sdk/client-codecommit"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';
// Initialize the CodeCommitClient
const client = new CodeCommitClient(config);

async function listApprovalRuleTemplates() {
  const input = { 
  };

  const command = new ListApprovalRuleTemplatesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Approval Rule Templates:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listApprovalRuleTemplates ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CodeCommit: ListApprovalRuleTemplates", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
    const functionsToExecute = [
        listApprovalRuleTemplates,    
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
          // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('codecommit.txt')
    }
    //  main() 
    module.exports = { main };
