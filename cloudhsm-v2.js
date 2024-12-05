const { CloudHSMV2Client, DescribeBackupsCommand, DescribeClustersCommand } = require("@aws-sdk/client-cloudhsm-v2");
const config = require('./awsConfig');
const logger = require('./logger');
const fs = require('fs'); 
let accumulatedOutput = '';
const client = new CloudHSMV2Client(config);

async function describeBackups() {
  const input = {};

  const command = new DescribeBackupsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Backups Description:", JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- describeBackups ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudHSMV2: Describe Backups", error);
  }
}

async function describeClusters() {
  const input = {};

  const command = new DescribeClustersCommand(input);

  try {
    const response = await client.send(command);
    console.log("Clusters Description:", JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- describeClusters ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudHSMV2: Describe Clusters", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
  const functionsToExecute = [
    describeBackups,
    describeClusters,
  ];

  for (const func of functionsToExecute) {
    try {
      await func();
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
      //logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
    }
  }
  saveAllOutputToFile('cloudhsm-v2.txt')
}

 //main();

module.exports = { main };
