const { CloudWatchClient, DescribeAnomalyDetectorsCommand, DescribeInsightRulesCommand, ListDashboardsCommand, ListMetricStreamsCommand,    } = require("@aws-sdk/client-cloudwatch"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';

// Initialize the CloudWatchClient outside the function
const client = new CloudWatchClient(config);

async function describeAnomalyDetectors() {
  const input = {};

  const command = new DescribeAnomalyDetectorsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Anomaly Detectors List:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- describeAnomalyDetectors ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: CloudWatch: Describe Anomaly Detectors", error);
  }
}

async function describeInsightRules() {
    const input = {};
  
    const command = new DescribeInsightRulesCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("Insight Rules List:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- describeInsightRules ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CloudWatch: Describe Insight Rules", error);
    }
  }

  async function listDashboards() {
    const input = {};
  
    const command = new ListDashboardsCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("Dashboards List:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listDashboards ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CloudWatch: List Dashboards", error);
    }
  }

  async function listMetricStreams() {
    const input = {};
  
    const command = new ListMetricStreamsCommand(input);
  
    try {
      const response = await client.send(command);
      console.log("Metric Streams List:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listMetricStreams ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: CloudWatch: List Metric Streams", error);
    }
  }

  function saveAllOutputToFile(filename) {
    fs.writeFileSync(filename, accumulatedOutput, 'utf8');
    console.log(`All output has been saved to ${filename}`);
    }

async function main() {
    const functionsToExecute = [
        describeAnomalyDetectors,    
        describeInsightRules, 
        listDashboards, 
        listMetricStreams, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
        //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('cloudwatch.txt')

    }
     main() 
    module.exports = { main };
