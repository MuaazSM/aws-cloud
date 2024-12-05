const { ACMPCAClient, ListCertificateAuthoritiesCommand } = require("@aws-sdk/client-acm-pca"); // CommonJS import
const logger = require('./logger')

const config = require("./awsConfig"); // Ensure your AWS config is set up correctly
const client = new ACMPCAClient(config);
const fs = require('fs'); 
let accumulatedOutput = '';

async function listCertificateAuthorities() {
    const input = { 
    };

    const command = new ListCertificateAuthoritiesCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listCertificateAuthorities ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
      logger.error("Error: acm_pca : list Certificate Authorities ", error);
    }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
  }

async function main() {
    const functionsToExecute = [
        listCertificateAuthorities, 
    ]
    for (const func of functionsToExecute) {
        try {
          await func(); // Await the function call
        } catch (error) {
          console.error(`Error executing ${func.name}:`, error);
           //logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
        }
      }
      saveAllOutputToFile('acm_pca.txt')
      }
    main()

    module.exports = { main };