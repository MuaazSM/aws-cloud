const { main: runAccountFunctions } = require('./account');  
const { main: runAcmPcaFunctions } = require('./acm_pca');  
const { main: runACMFunctions } = require('./acm')
const { main: runampFunctions } = require('./amp')
const { main: runamplifyFunctions } = require('./amplify')
const { main: runamplifybackendFunctions } = require('./amplifybackend')
const { main: runapigatewayFunctions } = require('./api-gateway')
const { main: runapigatewayv2Functions } = require('./apigatewayv2')
const { main: runappmeshFunctions } = require('./app-mesh')
const { main: runappconfigFunctions } = require('./appconfig')
const { main: runappfabricFunctions } = require('./appfabric')
const { main: runappflowFunctions } = require('./appflow')
const { main: runappintegrationsFunctions } = require('./appintegrations')
const { main: runapplicatoiondiscoveryserviceFunctions } = require('./application-discovery-service')
const { main: runapplicationinsightsFunctions } = require('./application-insights')
const { main: runapplicationsignalsFunctions } = require('./application-signals')
const { main: runapplicationcostprofilerFunctions } = require('./applicationcostprofiler')
const { main: runapprunnerFunctions } = require('./apprunner')
const { main: runappstreamFunctions } = require('./appstream')
const { main: runappsyncFunctions } = require('./appsync')
const { main: runapptestFunctions } = require('./apptest')
const { main: runarczonalshiftFunctions } = require('./arc-zonal-shift')
const { main: runartifactFunctions } = require('./artifact')
const { main: runathenaFunctions } = require('./athena')
const { main: runauditmanagerFunctions } = require('./auditmanager')
const { main: runautoscalingFunctions } = require('./auto-scaling')
const { main: runb2biFunctions } = require('./b2bi')
const { main: runbackupgatewayFunctions } = require('./backup-gateway')
const { main: runbackupFunctions } = require('./backup')
const { main: runbatchFunctions } = require('./batch')
const { main: runbcmdataexportsFunctions } = require('./bcm-data-exports')
const { main: runbedrockagentFunctions } = require('./bedrock-agent')
const { main: runbedrockFunctions } = require('./bedrock')
const { main: runbillingconductorFunctions } = require('./billingconductor')
const { main: runchatbotFunctions } = require('./chatbot')
const { main: runchimeFunctions } = require('./chime')
const { main: runcleanroomsFunctions } = require('./cleanrooms')
const { main: runcleanroomsmlFunctions } = require('./cleanroomsml')
const { main: runcloud9Functions } = require('./cloud9')
const { main: runcloudcontrolFunctions } = require('./cloudcontrol')
const { main: runclouddirectoryFunctions } = require('./clouddirectory')
const { main: runcloudfrontFunctions } = require('./cloudfront')
const { main: runcloudhsmv2Functions } = require('./cloudhsm-v2')
const { main: runcloudsearchFunctions } = require('./cloudsearch')
const { main: runcloudtrailFunctions } = require('./cloudtrail')
const { main: runcloudwatcheventsFunctions } = require('./cloudwatch-events')
const { main: runcloudwatchlogsFunctions } = require('./cloudwatch-logs')
const { main: runcloudwatchFunctions } = require('./cloudwatch')
const { main: runcodeartifactFunctions } = require('./codeartifact')
const { main: runcodebuildFunctions } = require('./codebuild')
const { main: runcodecatalystFunctions } = require('./codecatalyst')
const { main: runcodecommitFunctions } = require('./codecommit')
const { main: runcodeconnectionsFunctions } = require('./codeconnections')
const { main: runcodedeployFunctions } = require('./codedeploy')
const { main: runcodegurusecuirtyFunctions } = require('./codeguru-security')
const { main: runcodeguruprofilerFunctions } = require('./codeguruprofiler')
const { main: runcodepipelineFunctions } = require('./codepipeline')
const { main: runcodestarconnectionsFunctions } = require('./codestar-connections')
const { main: runcomprehendFunctions } = require('./comprehend')
const { main: runcomprehendmedicalFunctions } = require('./comprehendmedical')
const { main: runcomputeoptimizerFunctions } = require('./compute-optimizer')
const { main: runconfigserviceFunctions } = require('./config-service')
const { main: runconnectFunctions } = require('./connect')
const { main: runconnectcasesFunctions } = require('./connectcases')
const { main: runcontrolcatalogFunctions } = require('./controlcatalog')
const { main: runcontroltowerFunctions } = require('./controltower')
const { main: runcostandusagereportserviceFunctions } = require('./cost-and-usage-report-service')
const { main: runcostexplorerFunctions } = require('./cost-explorer')
const { main: rundatabasemigrationserviceFunctions } = require('./database-migration-service')
const { main: rundatabrewFunctions } = require('./databrew')
const { main: rundataexchangeFunctions } = require('./dataexchange')
const { main: rundatasyncFunctions } = require('./datasync')
const { main: rundatazoneFunctions } = require('./datazone')
const { main: rundaxFunctions } = require('./dax')
const { main: rundirectconnectFunctions } = require('./direct-connect')
const { main: rundocdbelasticFunctions } = require('./docdb-elastic')
const { main: rundocdbFunctions } = require('./docdb')
const { main: rundrsFunctions } = require('./drs')
const { main: runec2Functions } = require('./EC2')
const { main: runecrFunctions } = require('./ecr')
const { main: runecsFunctions } = require('./ecs')
const { main: runeksFunctions } = require('./eks')
const { main: runelasticbeanstalkFunctions } = require('./elastic-beanstalk')
const { main: runelasticloadbalancingv2Functions } = require('./elastic-load-balancing-v2')
const { main: runelasticloadbalancingFunctions } = require('./elastic-load-balancing')
const { main: runelastictranscoderFunctions } = require('./elastic-transcoder')
const { main: runelasticsearchserviceFunctions } = require('./elasticsearch-service')
const { main: runforecastFunctions } = require('./forecast')
const { main: runfrauddetectorFunctions } = require('./frauddetector')
const { main: runglueFunctions } = require('./glue')
const { main: rungreengrassFunctions } = require('./greengrass')
const { main: rungroundstationFunctions } = require('./groundstation')
const { main: runiamFunctions } = require('./iam')
const { main: runimagebuilderFunctions } = require('./imagebuilder')
const { main: runiot1clickdevicesserviceFunctions } = require('./iot-1click-devices-service')
const { main: runiot1clickprojectsFunctions } = require('./iot-1click-projects')
const { main: runioteventsFunctions } = require('./iot-events')
const { main: runiotwirelessFunctions } = require('./iot-wireless')
const { main: runiotFunctions } = require('./iot')
const { main: runiotanalyticsFunctions } = require('./iotanalytics')
const { main: runiotdeviceadvisorFunctions } = require('./iotdeviceadvisor')
const { main: runiotfleethubFunctions } = require('./iotfleethub')
const { main: runkafkaFunctions } = require('./kafka')
const { main: runkafkaconnectFunctions } = require('./kafkaconnect')
const { main: runlambdaFunctions } = require('./lambda')
const { main: runlaunchwizardFunctions } = require('./launch-wizard')
const { main: runlicensemanagerFunctions } = require('./license-manager')
const { main: runlightsailFunctions } = require('./lightsail')
const { main: runlocationFunctions } = require('./location')
const { main: runmaice2Functions } = require('./macie2')
const { main: runmailmanagerFunctions } = require('./mailmanager')
const { main: runmanagedblockchainFunctions } = require('./managedblockchain')
const { main: runmediaconnectFunctions } = require('./mediaconnect')
const { main: runmedialiveFunctions } = require('./medialive')
const { main: runmediapackageFunctions } = require('./mediapackage')
const { main: runmediatailorFunctions } = require('./mediatailor')
const { main: runmemorydbFunctions } = require('./memorydb')
const { main: runmgnFunctions } = require('./mgn')
const { main: runmigrationhubFunctions } = require('./migration-hub')
const { main: runmqFunctions } = require('./mq')
const { main: runmwaaFunctions } = require('./mwaa')
const { main: runnetworkfirewallFunctions } = require('./network-firewall')
const { main: runnetworkmonitorFunctions } = require('./networkmonitor')
const { main: runomicsFunctions } = require('./omics')
const { main: runopensearchFunctions } = require('./opensearch')
const { main: runorganizationsFunctions } = require('./organizations')
const { main: runosisFunctions } = require('./osis')
const { main: runpaymentcryptographyFunctions } = require('./payment-cryptography')
const { main: runpcaconnectorscepFunctions } = require('./pca-connector-scep')
const { main: runpcsFunctions } = require('./pcs')
const { main: runqldbFunctions } = require('./qldb')
const { main: runrdsFunctions } = require('./rds')
const { main: runredshiftFunctions } = require('./redshift')
const { main: runrekognitionFunctions } = require('./rekognition')
const { main: runrepostspaceFunctions } = require('./repostspace')
const { main: runrolesanywhereFunctions } = require('./rolesanywhere')
const { main: runroute53domainsFunctions } = require('./route-53-domains')
const { main: runroute53Functions } = require('./route-53')
const { main: runroute53recoverycontrolconfigFunctions } = require('./route53-recovery-control-config')
const { main: runroute53recoveryreadinessFunctions } = require('./route-53recovery-rediness')
const { main: runroute53profilesFunctions } = require('./route53profiles')
const { main: runroute53resolverFunctions } = require('./route53resolver')
const { main: runrumFunctions } = require('./rum')
const { main: runs3Functions } = require('./s3')
const { main: runsecurityhubFunctions } = require('./securityhub')
const { main: runsesFunctions } = require('./ses')
const { main: runssmFunctions } = require('./ssm')
const { main: runtransferFunctions } = require('./transfer')
const { main: runverifiedpermissionsFunctions } = require('./verifiedpermissions')

async function runAll() {
    try {
        // Run all main functions concurrently
        await Promise.all([
            runAccountFunctions(),
            runAcmPcaFunctions(),
            runACMFunctions(),
            runampFunctions(),
            runamplifyFunctions(),
            runamplifybackendFunctions(),
            runapigatewayFunctions(),
            runapigatewayv2Functions(),
            runappmeshFunctions(),
            runappconfigFunctions(),
            runappfabricFunctions(),
            runappflowFunctions(),
            runappintegrationsFunctions(),
            runapplicatoiondiscoveryserviceFunctions(),
            runapplicationinsightsFunctions(),
            runapplicationsignalsFunctions(),
            runapplicationcostprofilerFunctions(),
            runapprunnerFunctions(),
            runappstreamFunctions(),
            runappsyncFunctions(),
            runapptestFunctions(),
            runarczonalshiftFunctions(),
            runartifactFunctions(),
            runathenaFunctions(),
            runauditmanagerFunctions(),
            runautoscalingFunctions(),
            runb2biFunctions(),
            runbackupgatewayFunctions(),
            runbackupFunctions(),
            runbatchFunctions(),
            runbcmdataexportsFunctions(),
            runbedrockagentFunctions(),
            runbedrockFunctions(),
            runbillingconductorFunctions(),
            runchatbotFunctions(),
            runchimeFunctions(),
            runcleanroomsFunctions(),
            runcleanroomsmlFunctions(),
            runcloud9Functions(),
            runcloudcontrolFunctions(),
            runclouddirectoryFunctions(),
            runcloudfrontFunctions(),
            runcloudhsmv2Functions(),
            runcloudsearchFunctions(),
            runcloudtrailFunctions(),
            runcloudwatcheventsFunctions(),
            runcloudwatchlogsFunctions(),
            runcloudwatchFunctions(),
            runcodeartifactFunctions(),
            runcodebuildFunctions(),
            runcodecatalystFunctions(),
            runcodecommitFunctions(),
            runcodeconnectionsFunctions(),
            runcodedeployFunctions(),
            runcodegurusecuirtyFunctions(),
            runcodeguruprofilerFunctions(),
            runcodepipelineFunctions(),
            runcodestarconnectionsFunctions(),
            runcomprehendFunctions(),
            runcomprehendmedicalFunctions(),
            runcomputeoptimizerFunctions(),
            runconfigserviceFunctions(),
            runconnectFunctions(),
            runconnectcasesFunctions(),
            runcontrolcatalogFunctions(),
            runcontroltowerFunctions(),
            runcostandusagereportserviceFunctions(),
            runcostexplorerFunctions(),
            rundatabasemigrationserviceFunctions(),
            rundatabrewFunctions(),
            rundataexchangeFunctions(),
            rundatasyncFunctions(),
            rundatazoneFunctions(),
            rundaxFunctions(),
            rundirectconnectFunctions(),
            rundocdbelasticFunctions(),
            rundocdbFunctions(),
            rundrsFunctions(),
            runec2Functions(),
            runecrFunctions(),
            runecsFunctions(),
            runeksFunctions(),
            runelasticbeanstalkFunctions(),
            runelasticloadbalancingv2Functions(),
            runelasticloadbalancingFunctions(),
            runelastictranscoderFunctions(),
            runelasticsearchserviceFunctions(),
            runforecastFunctions(),
            runfrauddetectorFunctions(),
            runglueFunctions(),
            rungreengrassFunctions(),
            rungroundstationFunctions(),
            runiamFunctions(),
            runimagebuilderFunctions(),
            runiot1clickdevicesserviceFunctions(),
            runiot1clickprojectsFunctions(),
            runioteventsFunctions(),
            runiotwirelessFunctions(),
            runiotFunctions(),
            runiotanalyticsFunctions(),
            runiotdeviceadvisorFunctions(),
            runiotfleethubFunctions(),
            runkafkaFunctions(),
            runkafkaconnectFunctions(),
            runlambdaFunctions(),
            runlaunchwizardFunctions(),
            runlicensemanagerFunctions(),
            runlightsailFunctions(),
            runlocationFunctions(),
            runmaice2Functions(),
            runmailmanagerFunctions(),
            runmanagedblockchainFunctions(),
            runmediaconnectFunctions(),
            runmedialiveFunctions(),
            runmediapackageFunctions(),
            runmediatailorFunctions(),
            runmemorydbFunctions(),
            runmgnFunctions(),
            runmigrationhubFunctions(),
            runmqFunctions(),
            runmwaaFunctions(),
            runnetworkfirewallFunctions(),
            runnetworkmonitorFunctions(),
            runomicsFunctions(),
            runopensearchFunctions(),
            runorganizationsFunctions(),
            runosisFunctions(),
            runpaymentcryptographyFunctions(),
            runpcaconnectorscepFunctions(),
            runpcsFunctions(),
            runqldbFunctions(),
            runrdsFunctions(),
            runredshiftFunctions(),
            runrekognitionFunctions(),
            runrepostspaceFunctions(),
            runrolesanywhereFunctions(),
            runroute53domainsFunctions(),
            runroute53Functions(),
            runroute53recoverycontrolconfigFunctions(),
            runroute53recoveryreadinessFunctions(), 
            runroute53profilesFunctions(),
            runroute53resolverFunctions(),
            runrumFunctions(),
            runs3Functions(),
            runsecurityhubFunctions(),
            runsesFunctions(),
            runssmFunctions(),
            runtransferFunctions(),
            runverifiedpermissionsFunctions(),
        ]);
        console.log('All functions completed');
    } catch (error) {
        console.error('Error in running one or more functions:', error);
    }
}

// Run all functions at once
runAll();
