const { ComprehendClient, ListDatasetsCommand, ListDocumentClassificationJobsCommand, ListDocumentClassifierSummariesCommand,
  ListDocumentClassifiersCommand, ListDominantLanguageDetectionJobsCommand, ListEndpointsCommand, ListEntitiesDetectionJobsCommand,
  ListEntityRecognizerSummariesCommand, ListEntityRecognizersCommand, ListEventsDetectionJobsCommand, ListFlywheelIterationHistoryCommand, 
  ListFlywheelsCommand, ListKeyPhrasesDetectionJobsCommand, ListPiiEntitiesDetectionJobsCommand, ListSentimentDetectionJobsCommand } = require("@aws-sdk/client-comprehend"); // CommonJS import
const config = require('./awsConfig'); // Import your AWS configuration
const client = new ComprehendClient(config); // Create a client instance
const logger = require('./logger')
const fs = require('fs'); 
let accumulatedOutput = '';


async function listDatasets() {
  const input = {};

  const command = new ListDatasetsCommand(input);

  try {
      const response = await client.send(command);
      console.log("Datasets:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listDatasets ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListDatasets", error);
  }
}

async function listDocumentClassificationJobs() {
  const input = {};

  const command = new ListDocumentClassificationJobsCommand(input);

  try {
      const response = await client.send(command);
      console.log("Document Classification Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listDocumentClassificationJobs ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListDocumentClassificationJobs", error);
  }
}

async function listDocumentClassifierSummaries() {
  const input = {};

  const command = new ListDocumentClassifierSummariesCommand(input);

  try {
      const response = await client.send(command);
      console.log("Document Classifier Summaries:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listDocumentClassifierSummaries ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListDocumentClassifierSummaries", error);
  }
}

async function listDocumentClassifiers() {
  const input = {};

  const command = new ListDocumentClassifiersCommand(input);

  try {
      const response = await client.send(command);
      console.log("Document Classifiers:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listDocumentClassifiers ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListDocumentClassifiers", error);
  }
}

async function listDominantLanguageDetectionJobs() {
  const input = {};

  const command = new ListDominantLanguageDetectionJobsCommand(input);

  try {
      const response = await client.send(command);
      console.log("Dominant Language Detection Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
      accumulatedOutput += `\n--- listDominantLanguageDetectionJobs ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListDominantLanguageDetectionJobs", error);
  }
}

async function listEndpoints() {
  const input = {};

  const command = new ListEndpointsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Endpoints:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listEndpoints ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListEndpoints", error);
  }
}

async function listEntitiesDetectionJobs() {
  const input = {};

  const command = new ListEntitiesDetectionJobsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Entities Detection Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listEntitiesDetectionJobs ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListEntitiesDetectionJobs", error);
  }
}

async function listEntityRecognizerSummaries() {
  const input = {};

  const command = new ListEntityRecognizerSummariesCommand(input);

  try {
    const response = await client.send(command);
    console.log("Entity Recognizer Summaries:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listEntityRecognizerSummaries ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListEntityRecognizerSummaries", error);
  }
}

async function listEntityRecognizers() {
  const input = {};

  const command = new ListEntityRecognizersCommand(input);

  try {
    const response = await client.send(command);
    console.log("Entity Recognizers:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listEntityRecognizers ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListEntityRecognizers", error);
  }
}

async function listEventsDetectionJobs() {
  const input = {};

  const command = new ListEventsDetectionJobsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Events Detection Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listEventsDetectionJobs ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListEventsDetectionJobs", error);
  }
}

async function listFlywheelIterationHistory() {
  const input = {};

  const command = new ListFlywheelIterationHistoryCommand(input);

  try {
    const response = await client.send(command);
    console.log("Flywheel Iteration History:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listFlywheelIterationHistory ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListFlywheelIterationHistory", error);
  }
}

async function listFlywheels() {
  const input = {};

  const command = new ListFlywheelsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Flywheels:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listFlywheels ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListFlywheels", error);
  }
}

async function listKeyPhrasesDetectionJobs() {
  const input = {};

  const command = new ListKeyPhrasesDetectionJobsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Key Phrases Detection Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listKeyPhrasesDetectionJobs ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListKeyPhrasesDetectionJobs", error);
  }
}

async function listPiiEntitiesDetectionJobs() {
  const input = {};

  const command = new ListPiiEntitiesDetectionJobsCommand(input);

  try {
    const response = await client.send(command);
    console.log("PII Entities Detection Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listPiiEntitiesDetectionJobs ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListPiiEntitiesDetectionJobs", error);
  }
}

async function listSentimentDetectionJobs() {
  const input = {};

  const command = new ListSentimentDetectionJobsCommand(input);

  try {
    const response = await client.send(command);
    console.log("Sentiment Detection Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
    accumulatedOutput += `\n--- listSentimentDetectionJobs ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
    logger.error("Error: Comprehend: ListSentimentDetectionJobs", error);
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
  const functionsToExecute = [
      listDatasets,    
      listDocumentClassificationJobs, 
      listDocumentClassifierSummaries, 
      listDocumentClassifiers,  
      listDominantLanguageDetectionJobs, 
      listEndpoints, 
      listEntitiesDetectionJobs, 
      listEntityRecognizerSummaries, 
      listEntityRecognizers, 
      listEventsDetectionJobs,
      listFlywheelIterationHistory,
      listFlywheels,   
      listKeyPhrasesDetectionJobs, 
      listPiiEntitiesDetectionJobs, 
      listSentimentDetectionJobs
  ]
  for (const func of functionsToExecute) {
      try {
        await func(); // Await the function call
      } catch (error) {
        console.error(`Error executing ${func.name}:`, error);
        // logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
      }
    }
    saveAllOutputToFile('comprehend.txt')
  }
  // main() 
  module.exports = { main };
