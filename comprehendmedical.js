const { ComprehendMedicalClient, ListEntitiesDetectionV2JobsCommand, ListICD10CMInferenceJobsCommand, ListPHIDetectionJobsCommand,
  ListRxNormInferenceJobsCommand, ListSNOMEDCTInferenceJobsCommand, 
} = require("@aws-sdk/client-comprehendmedical"); // CommonJS import
const config = require('./awsConfig')
const client = new ComprehendMedicalClient(config); // Initialize client outside the function
const logger = require('./logger')

async function listEntitiesDetectionV2Jobs() {
const input = {};

const command = new ListEntitiesDetectionV2JobsCommand(input);

try {
  const response = await client.send(command);
  console.log("Entities Detection V2 Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
} catch (error) {
  logger.error("Error: ComprehendMedical: ListEntitiesDetectionV2Jobs", error);
}
}

async function listICD10CMInferenceJobs() {
  const input = {};

  const command = new ListICD10CMInferenceJobsCommand(input);

  try {
    const response = await client.send(command);
    console.log("ICD-10-CM Inference Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
  } catch (error) {
    logger.error("Error: ComprehendMedical: ListICD10CMInferenceJobs", error);
  }
}

async function listPHIDetectionJobs() {
  const input = {};

  const command = new ListPHIDetectionJobsCommand(input);

  try {
    const response = await client.send(command);
    console.log("PHI Detection Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
  } catch (error) {
    logger.error("Error: ComprehendMedical: ListPHIDetectionJobs", error);
  }
}

async function listRxNormInferenceJobs() {
  const input = {};

  const command = new ListRxNormInferenceJobsCommand(input);

  try {
    const response = await client.send(command);
    console.log("RxNorm Inference Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
  } catch (error) {
    logger.error("Error: ComprehendMedical: ListRxNormInferenceJobs", error);
  }
}

async function listSNOMEDCTInferenceJobs() {
  const input = {};

  const command = new ListSNOMEDCTInferenceJobsCommand(input);

  try {
    const response = await client.send(command);
    console.log("SNOMED CT Inference Jobs:", JSON.stringify(response, null, 2)); // Pretty print the response
  } catch (error) {
    logger.error("Error: ComprehendMedical: ListSNOMEDCTInferenceJobs", error);
  }
}

async function main() {
  const functionsToExecute = [
      listEntitiesDetectionV2Jobs,    
      listICD10CMInferenceJobs, 
      listPHIDetectionJobs,
      listRxNormInferenceJobs, 
      listSNOMEDCTInferenceJobs,  
  ]
  for (const func of functionsToExecute) {
      try {
        await func(); // Await the function call
      } catch (error) {
        console.error(`Error executing ${func.name}:`, error);
      //   logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
      }
    }}
  //  main()

module.exports = { main };
