const { EC2Client, DescribeAccountAttributesCommand, DescribeAvailabilityZonesCommand, DescribeInstanceTypesCommand,
  DescribeInstancesCommand, DescribeInternetGatewaysCommand, DescribeIpamByoasnCommand, DescribeIpamExternalResourceVerificationTokensCommand, DescribeIpamPoolsCommand, DescribeIpamResourceDiscoveriesCommand, DescribeIpamResourceDiscoveryAssociationsCommand, DescribeIpamScopesCommand, DescribeIpamsCommand, DescribeIpv6PoolsCommand, DescribeKeyPairsCommand, DescribeLaunchTemplatesCommand, DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsCommand, DescribeLocalGatewayRouteTableVpcAssociationsCommand, DescribeLocalGatewayRouteTablesCommand, DescribeLocalGatewayVirtualInterfaceGroupsCommand, DescribeLocalGatewayVirtualInterfacesCommand, DescribeLocalGatewaysCommand, DescribeLockedSnapshotsCommand, DescribeMacHostsCommand, DescribeManagedPrefixListsCommand, DescribeNatGatewaysCommand, DescribeNetworkAclsCommand, DescribeNetworkInsightsAccessScopeAnalysesCommand, DescribeNetworkInsightsAccessScopesCommand, DescribeNetworkInsightsAnalysesCommand, DescribeNetworkInsightsPathsCommand, DescribeNetworkInterfacesCommand, DescribeNetworkInterfaceAttributeCommand,
  DescribeNetworkInterfacePermissionsCommand, DescribePlacementGroupsCommand, DescribePrefixListsCommand, DescribePrincipalIdFormatCommand, 
  DescribePublicIpv4PoolsCommand, DescribeRegionsCommand, DescribeReservedInstancesCommand, DescribeReservedInstancesModificationsCommand, 
  DescribeRouteTablesCommand, DescribeSecurityGroupsCommand, DescribeSnapshotsCommand, DescribeStoreImageTasksCommand, DescribeSubnetsCommand, 
  DescribeTagsCommand, DescribeTrafficMirrorFilterRulesCommand, DescribeTrafficMirrorFiltersCommand, DescribeTrafficMirrorSessionsCommand, 
  DescribeTrafficMirrorTargetsCommand, DescribeTransitGatewayAttachmentsCommand, DescribeTransitGatewayConnectPeersCommand, DescribeTransitGatewayConnectsCommand, 
  DescribeTransitGatewayMulticastDomainsCommand, DescribeTransitGatewayPeeringAttachmentsCommand, DescribeTransitGatewayPolicyTablesCommand, 
  DescribeTransitGatewayRouteTableAnnouncementsCommand, DescribeTransitGatewayVpcAttachmentsCommand, DescribeTransitGatewaysCommand, 
  DescribeVerifiedAccessEndpointsCommand, DescribeVerifiedAccessGroupsCommand, DescribeVerifiedAccessInstanceLoggingConfigurationsCommand, 
  DescribeVerifiedAccessInstancesCommand, DescribeVerifiedAccessTrustProvidersCommand, DescribeVolumesCommand, DescribeVolumesModificationsCommand, 
  DescribeVpcEndpointConnectionNotificationsCommand, DescribeVpcEndpointConnectionsCommand, DescribeVpcEndpointServiceConfigurationsCommand, 
  DescribeVpcEndpointServicesCommand, DescribeVpcEndpointsCommand, DescribeVpcPeeringConnectionsCommand, DescribeVpcsCommand, 
  DescribeVpnConnectionsCommand, DescribeVpnGatewaysCommand, GetEbsDefaultKmsKeyIdCommand, GetEbsEncryptionByDefaultCommand, 
  GetSerialConsoleAccessStatusCommand, GetSnapshotBlockPublicAccessStateCommand, GetVpnConnectionDeviceTypesCommand, ListImagesInRecycleBinCommand, 
  ListSnapshotsInRecycleBinCommand, 



} = require("@aws-sdk/client-ec2");
const config = require("./awsConfig"); 
const logger = require('./logger')
const fs = require('fs'); 
const client = new EC2Client(config);

let accumulatedOutput = '';

async function describeAccountAttributes() {
  const input = {
    DryRun: false,
    AttributeNames: ["supported-platforms", "default-vpc"],
  };

  const command = new DescribeAccountAttributesCommand(input);

  try {
    const response = await client.send(command);
    //console.log("Describe Account Attributes", JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- describeAccountAttributes ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);

    
  }
}

async function getAvailabilityZones() {
  const input = {
    AllAvailabilityZones: true,
  };

  const command = new DescribeAvailabilityZonesCommand(input);

  try {
    const response = await client.send(command);
    //console.log("Availability Zones:", response.AvailabilityZones);
    accumulatedOutput += `\n--- getAvailabilityZones ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
    logger.error("Error:", error);
    
  }
}



async function describeintancetype() {
  const input = {
    DryRun: false, // Set to true if you want to test the request without making a call
    InstanceTypes: [
      "a1.medium" || "a1.large" || "a1.xlarge" || "a1.2xlarge" || "a1.4xlarge" || "a1.metal" || "c1.medium" || "c1.xlarge" || "c3.large" || "c3.xlarge" || "c3.2xlarge" || "c3.4xlarge" || "c3.8xlarge" || "c4.large" || "c4.xlarge" || "c4.2xlarge" || "c4.4xlarge" || "c4.8xlarge" || "c5.large" || "c5.xlarge" || "c5.2xlarge" || "c5.4xlarge" || "c5.9xlarge" || "c5.12xlarge" || "c5.18xlarge" || "c5.24xlarge" || "c5.metal" || "c5a.large" || "c5a.xlarge" || "c5a.2xlarge" || "c5a.4xlarge" || "c5a.8xlarge" || "c5a.12xlarge" || "c5a.16xlarge" || "c5a.24xlarge" || "c5ad.large" || "c5ad.xlarge" || "c5ad.2xlarge" || "c5ad.4xlarge" || "c5ad.8xlarge" || "c5ad.12xlarge" || "c5ad.16xlarge" || "c5ad.24xlarge" || "c5d.large" || "c5d.xlarge" || "c5d.2xlarge" || "c5d.4xlarge" || "c5d.9xlarge" || "c5d.12xlarge" || "c5d.18xlarge" || "c5d.24xlarge" || "c5d.metal" || "c5n.large" || "c5n.xlarge" || "c5n.2xlarge" || "c5n.4xlarge" || "c5n.9xlarge" || "c5n.18xlarge" || "c5n.metal" || "c6g.medium" || "c6g.large" || "c6g.xlarge" || "c6g.2xlarge" || "c6g.4xlarge" || "c6g.8xlarge" || "c6g.12xlarge" || "c6g.16xlarge" || "c6g.metal" || "c6gd.medium" || "c6gd.large" || "c6gd.xlarge" || "c6gd.2xlarge" || "c6gd.4xlarge" || "c6gd.8xlarge" || "c6gd.12xlarge" || "c6gd.16xlarge" || "c6gd.metal" || "c6gn.medium" || "c6gn.large" || "c6gn.xlarge" || "c6gn.2xlarge" || "c6gn.4xlarge" || "c6gn.8xlarge" || "c6gn.12xlarge" || "c6gn.16xlarge" || "c6i.large" || "c6i.xlarge" || "c6i.2xlarge" || "c6i.4xlarge" || "c6i.8xlarge" || "c6i.12xlarge" || "c6i.16xlarge" || "c6i.24xlarge" || "c6i.32xlarge" || "c6i.metal" || "cc1.4xlarge" || "cc2.8xlarge" || "cg1.4xlarge" || "cr1.8xlarge" || "d2.xlarge" || "d2.2xlarge" || "d2.4xlarge" || "d2.8xlarge" || "d3.xlarge" || "d3.2xlarge" || "d3.4xlarge" || "d3.8xlarge" || "d3en.xlarge" || "d3en.2xlarge" || "d3en.4xlarge" || "d3en.6xlarge" || "d3en.8xlarge" || "d3en.12xlarge" || "dl1.24xlarge" || "f1.2xlarge" || "f1.4xlarge" || "f1.16xlarge" || "g2.2xlarge" || "g2.8xlarge" || "g3.4xlarge" || "g3.8xlarge" || "g3.16xlarge" || "g3s.xlarge" || "g4ad.xlarge" || "g4ad.2xlarge" || "g4ad.4xlarge" || "g4ad.8xlarge" || "g4ad.16xlarge" || "g4dn.xlarge" || "g4dn.2xlarge" || "g4dn.4xlarge" || "g4dn.8xlarge" || "g4dn.12xlarge" || "g4dn.16xlarge" || "g4dn.metal" || "g5.xlarge" || "g5.2xlarge" || "g5.4xlarge" || "g5.8xlarge" || "g5.12xlarge" || "g5.16xlarge" || "g5.24xlarge" || "g5.48xlarge" || "g5g.xlarge" || "g5g.2xlarge" || "g5g.4xlarge" || "g5g.8xlarge" || "g5g.16xlarge" || "g5g.metal" || "hi1.4xlarge" || "hpc6a.48xlarge" || "hs1.8xlarge" || "h1.2xlarge" || "h1.4xlarge" || "h1.8xlarge" || "h1.16xlarge" || "i2.xlarge" || "i2.2xlarge" || "i2.4xlarge" || "i2.8xlarge" || "i3.large" || "i3.xlarge" || "i3.2xlarge" || "i3.4xlarge" || "i3.8xlarge" || "i3.16xlarge" || "i3.metal" || "i3en.large" || "i3en.xlarge" || "i3en.2xlarge" || "i3en.3xlarge" || "i3en.6xlarge" || "i3en.12xlarge" || "i3en.24xlarge" || "i3en.metal" || "im4gn.large" || "im4gn.xlarge" || "im4gn.2xlarge" || "im4gn.4xlarge" || "im4gn.8xlarge" || "im4gn.16xlarge" || "inf1.xlarge" || "inf1.2xlarge" || "inf1.6xlarge" || "inf1.24xlarge" || "is4gen.medium" || "is4gen.large" || "is4gen.xlarge" || "is4gen.2xlarge" || "is4gen.4xlarge" || "is4gen.8xlarge" || "m1.small" || "m1.medium" || "m1.large" || "m1.xlarge" || "m2.xlarge" || "m2.2xlarge" || "m2.4xlarge" || "m3.medium" || "m3.large" || "m3.xlarge" || "m3.2xlarge" || "m4.large" || "m4.xlarge" || "m4.2xlarge" || "m4.4xlarge" || "m4.10xlarge" || "m4.16xlarge" || "m5.large" || "m5.xlarge" || "m5.2xlarge" || "m5.4xlarge" || "m5.8xlarge" || "m5.12xlarge" || "m5.16xlarge" || "m5.24xlarge" || "m5.metal" || "m5a.large" || "m5a.xlarge" || "m5a.2xlarge" || "m5a.4xlarge" || "m5a.8xlarge" || "m5a.12xlarge" || "m5a.16xlarge" || "m5a.24xlarge" || "m5ad.large" || "m5ad.xlarge" || "m5ad.2xlarge" || "m5ad.4xlarge" || "m5ad.8xlarge" || "m5ad.12xlarge" || "m5ad.16xlarge" || "m5ad.24xlarge" || "m5d.large" || "m5d.xlarge" || "m5d.2xlarge" || "m5d.4xlarge" || "m5d.8xlarge" || "m5d.12xlarge" || "m5d.16xlarge" || "m5d.24xlarge" || "m5d.metal" || "m5dn.large" || "m5dn.xlarge" || "m5dn.2xlarge" || "m5dn.4xlarge" || "m5dn.8xlarge" || "m5dn.12xlarge" || "m5dn.16xlarge" || "m5dn.24xlarge" || "m5dn.metal" || "m5n.large" || "m5n.xlarge" || "m5n.2xlarge" || "m5n.4xlarge" || "m5n.8xlarge" || "m5n.12xlarge" || "m5n.16xlarge" || "m5n.24xlarge" || "m5n.metal" || "m5zn.large" || "m5zn.xlarge" || "m5zn.2xlarge" || "m5zn.3xlarge" || "m5zn.6xlarge" || "m5zn.12xlarge" || "m5zn.metal" || "m6a.large" || "m6a.xlarge" || "m6a.2xlarge" || "m6a.4xlarge" || "m6a.8xlarge" || "m6a.12xlarge" || "m6a.16xlarge" || "m6a.24xlarge" || "m6a.32xlarge" || "m6a.48xlarge" || "m6g.metal" || "m6g.medium" || "m6g.large" || "m6g.xlarge" || "m6g.2xlarge" || "m6g.4xlarge" || "m6g.8xlarge" || "m6g.12xlarge" || "m6g.16xlarge" || "m6gd.metal" || "m6gd.medium" || "m6gd.large" || "m6gd.xlarge" || "m6gd.2xlarge" || "m6gd.4xlarge" || "m6gd.8xlarge" || "m6gd.12xlarge" || "m6gd.16xlarge" || "m6i.large" || "m6i.xlarge" || "m6i.2xlarge" || "m6i.4xlarge" || "m6i.8xlarge" || "m6i.12xlarge" || "m6i.16xlarge" || "m6i.24xlarge" || "m6i.32xlarge" || "m6i.metal" || "mac1.metal" || "p2.xlarge" || "p2.8xlarge" || "p2.16xlarge" || "p3.2xlarge" || "p3.8xlarge" || "p3.16xlarge" || "p3dn.24xlarge" || "p4d.24xlarge" || "r3.large" || "r3.xlarge" || "r3.2xlarge" || "r3.4xlarge" || "r3.8xlarge" || "r4.large" || "r4.xlarge" || "r4.2xlarge" || "r4.4xlarge" || "r4.8xlarge" || "r4.16xlarge" || "r5.large" || "r5.xlarge" || "r5.2xlarge" || "r5.4xlarge" || "r5.8xlarge" || "r5.12xlarge" || "r5.16xlarge" || "r5.24xlarge" || "r5.metal" || "r5a.large" || "r5a.xlarge" || "r5a.2xlarge" || "r5a.4xlarge" || "r5a.8xlarge" || "r5a.12xlarge" || "r5a.16xlarge" || "r5a.24xlarge" || "r5ad.large" || "r5ad.xlarge" || "r5ad.2xlarge" || "r5ad.4xlarge" || "r5ad.8xlarge" || "r5ad.12xlarge" || "r5ad.16xlarge" || "r5ad.24xlarge" || "r5b.large" || "r5b.xlarge" || "r5b.2xlarge" || "r5b.4xlarge" || "r5b.8xlarge" || "r5b.12xlarge" || "r5b.16xlarge" || "r5b.24xlarge" || "r5b.metal" || "r5d.large" || "r5d.xlarge" || "r5d.2xlarge" || "r5d.4xlarge" || "r5d.8xlarge" || "r5d.12xlarge" || "r5d.16xlarge" || "r5d.24xlarge" || "r5d.metal" || "r5dn.large" || "r5dn.xlarge" || "r5dn.2xlarge" || "r5dn.4xlarge" || "r5dn.8xlarge" || "r5dn.12xlarge" || "r5dn.16xlarge" || "r5dn.24xlarge" || "r5dn.metal" || "r5n.large" || "r5n.xlarge" || "r5n.2xlarge" || "r5n.4xlarge" || "r5n.8xlarge" || "r5n.12xlarge" || "r5n.16xlarge" || "r5n.24xlarge" || "r5n.metal" || "r6g.medium" || "r6g.large" || "r6g.xlarge" || "r6g.2xlarge" || "r6g.4xlarge" || "r6g.8xlarge" || "r6g.12xlarge" || "r6g.16xlarge" || "r6g.metal" || "r6gd.medium" || "r6gd.large" || "r6gd.xlarge" || "r6gd.2xlarge" || "r6gd.4xlarge" || "r6gd.8xlarge" || "r6gd.12xlarge" || "r6gd.16xlarge" || "r6gd.metal" || "r6i.large" || "r6i.xlarge" || "r6i.2xlarge" || "r6i.4xlarge" || "r6i.8xlarge" || "r6i.12xlarge" || "r6i.16xlarge" || "r6i.24xlarge" || "r6i.32xlarge" || "r6i.metal" || "t1.micro" || "t2.nano" || "t2.micro" || "t2.small" || "t2.medium" || "t2.large" || "t2.xlarge" || "t2.2xlarge" || "t3.nano" || "t3.micro" || "t3.small" || "t3.medium" || "t3.large" || "t3.xlarge" || "t3.2xlarge" || "t3a.nano" || "t3a.micro" || "t3a.small" || "t3a.medium" || "t3a.large" || "t3a.xlarge" || "t3a.2xlarge" || "t4g.nano" || "t4g.micro" || "t4g.small" || "t4g.medium" || "t4g.large" || "t4g.xlarge" || "t4g.2xlarge" || "u-6tb1.56xlarge" || "u-6tb1.112xlarge" || "u-9tb1.112xlarge" || "u-12tb1.112xlarge" || "u-6tb1.metal" || "u-9tb1.metal" || "u-12tb1.metal" || "u-18tb1.metal" || "u-24tb1.metal" || "vt1.3xlarge" || "vt1.6xlarge" || "vt1.24xlarge" || "x1.16xlarge" || "x1.32xlarge" || "x1e.xlarge" || "x1e.2xlarge" || "x1e.4xlarge" || "x1e.8xlarge" || "x1e.16xlarge" || "x1e.32xlarge" || "x2iezn.2xlarge" || "x2iezn.4xlarge" || "x2iezn.6xlarge" || "x2iezn.8xlarge" || "x2iezn.12xlarge" || "x2iezn.metal" || "x2gd.medium" || "x2gd.large" || "x2gd.xlarge" || "x2gd.2xlarge" || "x2gd.4xlarge" || "x2gd.8xlarge" || "x2gd.12xlarge" || "x2gd.16xlarge" || "x2gd.metal" || "z1d.large" || "z1d.xlarge" || "z1d.2xlarge" || "z1d.3xlarge" || "z1d.6xlarge" || "z1d.12xlarge" || "z1d.metal" || "x2idn.16xlarge" || "x2idn.24xlarge" || "x2idn.32xlarge" || "x2iedn.xlarge" || "x2iedn.2xlarge" || "x2iedn.4xlarge" || "x2iedn.8xlarge" || "x2iedn.16xlarge" || "x2iedn.24xlarge" || "x2iedn.32xlarge" || "c6a.large" || "c6a.xlarge" || "c6a.2xlarge" || "c6a.4xlarge" || "c6a.8xlarge" || "c6a.12xlarge" || "c6a.16xlarge" || "c6a.24xlarge" || "c6a.32xlarge" || "c6a.48xlarge" || "c6a.metal" || "m6a.metal" || "i4i.large" || "i4i.xlarge" || "i4i.2xlarge" || "i4i.4xlarge" || "i4i.8xlarge" || "i4i.16xlarge" || "i4i.32xlarge" || "i4i.metal" || "x2idn.metal" || "x2iedn.metal" || "c7g.medium" || "c7g.large" || "c7g.xlarge" || "c7g.2xlarge" || "c7g.4xlarge" || "c7g.8xlarge" || "c7g.12xlarge" || "c7g.16xlarge" || "mac2.metal" || "c6id.large" || "c6id.xlarge" || "c6id.2xlarge" || "c6id.4xlarge" || "c6id.8xlarge" || "c6id.12xlarge" || "c6id.16xlarge" || "c6id.24xlarge" || "c6id.32xlarge" || "c6id.metal" || "m6id.large" || "m6id.xlarge" || "m6id.2xlarge" || "m6id.4xlarge" || "m6id.8xlarge" || "m6id.12xlarge" || "m6id.16xlarge" || "m6id.24xlarge" || "m6id.32xlarge" || "m6id.metal" || "r6id.large" || "r6id.xlarge" || "r6id.2xlarge" || "r6id.4xlarge" || "r6id.8xlarge" || "r6id.12xlarge" || "r6id.16xlarge" || "r6id.24xlarge" || "r6id.32xlarge" || "r6id.metal" || "r6a.large" || "r6a.xlarge" || "r6a.2xlarge" || "r6a.4xlarge" || "r6a.8xlarge" || "r6a.12xlarge" || "r6a.16xlarge" || "r6a.24xlarge" || "r6a.32xlarge" || "r6a.48xlarge" || "r6a.metal" || "p4de.24xlarge" || "u-3tb1.56xlarge" || "u-18tb1.112xlarge" || "u-24tb1.112xlarge" || "trn1.2xlarge" || "trn1.32xlarge" || "hpc6id.32xlarge" || "c6in.large" || "c6in.xlarge" || "c6in.2xlarge" || "c6in.4xlarge" || "c6in.8xlarge" || "c6in.12xlarge" || "c6in.16xlarge" || "c6in.24xlarge" || "c6in.32xlarge" || "m6in.large" || "m6in.xlarge" || "m6in.2xlarge" || "m6in.4xlarge" || "m6in.8xlarge" || "m6in.12xlarge" || "m6in.16xlarge" || "m6in.24xlarge" || "m6in.32xlarge" || "m6idn.large" || "m6idn.xlarge" || "m6idn.2xlarge" || "m6idn.4xlarge" || "m6idn.8xlarge" || "m6idn.12xlarge" || "m6idn.16xlarge" || "m6idn.24xlarge" || "m6idn.32xlarge" || "r6in.large" || "r6in.xlarge" || "r6in.2xlarge" || "r6in.4xlarge" || "r6in.8xlarge" || "r6in.12xlarge" || "r6in.16xlarge" || "r6in.24xlarge" || "r6in.32xlarge" || "r6idn.large" || "r6idn.xlarge" || "r6idn.2xlarge" || "r6idn.4xlarge" || "r6idn.8xlarge" || "r6idn.12xlarge" || "r6idn.16xlarge" || "r6idn.24xlarge" || "r6idn.32xlarge" || "c7g.metal" || "m7g.medium" || "m7g.large" || "m7g.xlarge" || "m7g.2xlarge" || "m7g.4xlarge" || "m7g.8xlarge" || "m7g.12xlarge" || "m7g.16xlarge" || "m7g.metal" || "r7g.medium" || "r7g.large" || "r7g.xlarge" || "r7g.2xlarge" || "r7g.4xlarge" || "r7g.8xlarge" || "r7g.12xlarge" || "r7g.16xlarge" || "r7g.metal" || "c6in.metal" || "m6in.metal" || "m6idn.metal" || "r6in.metal" || "r6idn.metal" || "inf2.xlarge" || "inf2.8xlarge" || "inf2.24xlarge" || "inf2.48xlarge" || "trn1n.32xlarge" || "i4g.large" || "i4g.xlarge" || "i4g.2xlarge" || "i4g.4xlarge" || "i4g.8xlarge" || "i4g.16xlarge" || "hpc7g.4xlarge" || "hpc7g.8xlarge" || "hpc7g.16xlarge" || "c7gn.medium" || "c7gn.large" || "c7gn.xlarge" || "c7gn.2xlarge" || "c7gn.4xlarge" || "c7gn.8xlarge" || "c7gn.12xlarge" || "c7gn.16xlarge" || "p5.48xlarge" || "m7i.large" || "m7i.xlarge" || "m7i.2xlarge" || "m7i.4xlarge" || "m7i.8xlarge" || "m7i.12xlarge" || "m7i.16xlarge" || "m7i.24xlarge" || "m7i.48xlarge" || "m7i-flex.large" || "m7i-flex.xlarge" || "m7i-flex.2xlarge" || "m7i-flex.4xlarge" || "m7i-flex.8xlarge" || "m7a.medium" || "m7a.large" || "m7a.xlarge" || "m7a.2xlarge" || "m7a.4xlarge" || "m7a.8xlarge" || "m7a.12xlarge" || "m7a.16xlarge" || "m7a.24xlarge" || "m7a.32xlarge" || "m7a.48xlarge" || "m7a.metal-48xl" || "hpc7a.12xlarge" || "hpc7a.24xlarge" || "hpc7a.48xlarge" || "hpc7a.96xlarge" || "c7gd.medium" || "c7gd.large" || "c7gd.xlarge" || "c7gd.2xlarge" || "c7gd.4xlarge" || "c7gd.8xlarge" || "c7gd.12xlarge" || "c7gd.16xlarge" || "m7gd.medium" || "m7gd.large" || "m7gd.xlarge" || "m7gd.2xlarge" || "m7gd.4xlarge" || "m7gd.8xlarge" || "m7gd.12xlarge" || "m7gd.16xlarge" || "r7gd.medium" || "r7gd.large" || "r7gd.xlarge" || "r7gd.2xlarge" || "r7gd.4xlarge" || "r7gd.8xlarge" || "r7gd.12xlarge" || "r7gd.16xlarge" || "r7a.medium" || "r7a.large" || "r7a.xlarge" || "r7a.2xlarge" || "r7a.4xlarge" || "r7a.8xlarge" || "r7a.12xlarge" || "r7a.16xlarge" || "r7a.24xlarge" || "r7a.32xlarge" || "r7a.48xlarge" || "c7i.large" || "c7i.xlarge" || "c7i.2xlarge" || "c7i.4xlarge" || "c7i.8xlarge" || "c7i.12xlarge" || "c7i.16xlarge" || "c7i.24xlarge" || "c7i.48xlarge" || "mac2-m2pro.metal" || "r7iz.large" || "r7iz.xlarge" || "r7iz.2xlarge" || "r7iz.4xlarge" || "r7iz.8xlarge" || "r7iz.12xlarge" || "r7iz.16xlarge" || "r7iz.32xlarge" || "c7a.medium" || "c7a.large" || "c7a.xlarge" || "c7a.2xlarge" || "c7a.4xlarge" || "c7a.8xlarge" || "c7a.12xlarge" || "c7a.16xlarge" || "c7a.24xlarge" || "c7a.32xlarge" || "c7a.48xlarge" || "c7a.metal-48xl" || "r7a.metal-48xl" || "r7i.large" || "r7i.xlarge" || "r7i.2xlarge" || "r7i.4xlarge" || "r7i.8xlarge" || "r7i.12xlarge" || "r7i.16xlarge" || "r7i.24xlarge" || "r7i.48xlarge" || "dl2q.24xlarge" || "mac2-m2.metal" || "i4i.12xlarge" || "i4i.24xlarge" || "c7i.metal-24xl" || "c7i.metal-48xl" || "m7i.metal-24xl" || "m7i.metal-48xl" || "r7i.metal-24xl" || "r7i.metal-48xl" || "r7iz.metal-16xl" || "r7iz.metal-32xl" || "c7gd.metal" || "m7gd.metal" || "r7gd.metal" || "g6.xlarge" || "g6.2xlarge" || "g6.4xlarge" || "g6.8xlarge" || "g6.12xlarge" || "g6.16xlarge" || "g6.24xlarge" || "g6.48xlarge" || "gr6.4xlarge" || "gr6.8xlarge" || "c7i-flex.large" || "c7i-flex.xlarge" || "c7i-flex.2xlarge" || "c7i-flex.4xlarge" || "c7i-flex.8xlarge" || "u7i-12tb.224xlarge" || "u7in-16tb.224xlarge" || "u7in-24tb.224xlarge" || "u7in-32tb.224xlarge" || "u7ib-12tb.224xlarge" || "c7gn.metal" || "r8g.medium" || "r8g.large" || "r8g.xlarge" || "r8g.2xlarge" || "r8g.4xlarge" || "r8g.8xlarge" || "r8g.12xlarge" || "r8g.16xlarge" || "r8g.24xlarge" || "r8g.48xlarge" || "r8g.metal-24xl" || "r8g.metal-48xl" || "mac2-m1ultra.metal" || "g6e.xlarge" || "g6e.2xlarge" || "g6e.4xlarge" || "g6e.8xlarge" || "g6e.12xlarge" || "g6e.16xlarge" || "g6e.24xlarge" || "g6e.48xlarge",
    ],
  };

  try {
    const command = new DescribeInstanceTypesCommand(input);
    const response = await client.send(command);
    //console.log("Describe Instances type: ", JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- describeintancetype ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
   logger.error("Error:", error);
  }
}


async function describeinstances() {

  const command = new DescribeInstancesCommand({});

  try {
    const response = await client.send(command);
    // console.log("Instance description", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeinstances ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeinternetgateways() {
  const command = new DescribeInternetGatewaysCommand({}); // Empty input object

  try {
    const response = await client.send(command);
    //console.log("Describe internet gateways:", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeinternetgateways ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function IpamByoasn() {
  const command = new DescribeIpamByoasnCommand({}); // Empty input for all BYOASNs

  try {
    const response = await client.send(command);
    //console.log("IpamByoasn: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- IpamByoasn ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeIpamTokens() {
  const command = new DescribeIpamExternalResourceVerificationTokensCommand({}); // Empty input

  try {
    const response = await client.send(command);
    // console.log("IpamERVT: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeIpamTokens ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeIpamPools() {
  const command = new DescribeIpamPoolsCommand({}); // Empty input

  try {
    const response = await client.send(command);
    //console.log("desc ipam pools: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeIpamPools ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeIpamResourceDiscoveries() {
  const command = new DescribeIpamResourceDiscoveriesCommand({}); // Empty input

  try {
    const response = await client.send(command);
    //console.log("IpamResourceDiscoveries Raw Response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeIpamResourceDiscoveries ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
     logger.error("Error:", error);
    
  }
}

async function describeIpamResourceDiscoveryAssociations() {
  const command = new DescribeIpamResourceDiscoveryAssociationsCommand({}); // Empty input

  try {
    const response = await client.send(command);
    //console.log("IpamResourceDiscoveryAssociations Raw Response", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeIpamResourceDiscoveryAssociations ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeIpamScopes() {
  const command = new DescribeIpamScopesCommand({}); // Empty input

  try {
    const response = await client.send(command);
    // console.log("IpamScopes Raw response:", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeIpamScopes ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeIpams() {
  const command = new DescribeIpamsCommand({}); // Empty input

  try {
    const response = await client.send(command);
    //console.log("Ipams raw response:", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeIpams ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeIpv6Pools() {
  const command = new DescribeIpv6PoolsCommand({}); // Empty input for all IPv6 pools

  try {
    const response = await client.send(command);
    //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeIpv6Pools ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeKeyPairs() {
  const command = new DescribeKeyPairsCommand({}); // Empty input to fetch all key pairs

  try {
    const response = await client.send(command);
    //console.log("KeyPairs raw response:", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeKeyPairs ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeLaunchTemplates() {
  const command = new DescribeLaunchTemplatesCommand({}); // Empty input to fetch all launch templates

  try {
    const response = await client.send(command);
    //console.log("LaunchTemplates raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeLaunchTemplates ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}

async function describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations() {
  const command = new DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsCommand({}); // Empty input to fetch all associations

  try {
    const response = await client.send(command);
    //console.log("LocalGatewayRouteTableVirtualInterfaceGroup raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeLocalGatewayRouteTableVpcAssociations() {
  const command = new DescribeLocalGatewayRouteTableVpcAssociationsCommand({}); // Empty input to fetch all associations

  try {
    const response = await client.send(command);
    //console.log("LocalGatewayRouteTableVpc raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeLocalGatewayRouteTableVpcAssociations ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}

async function describeLocalGatewayRouteTables() {
  const command = new DescribeLocalGatewayRouteTablesCommand({}); // Empty input to fetch all route tables

  try {
    const response = await client.send(command);
    //console.log("LocalGatewayRouteTables raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeLocalGatewayRouteTables ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeLocalGatewayVirtualInterfaceGroups() {
  const command = new DescribeLocalGatewayVirtualInterfaceGroupsCommand({}); // Empty input to fetch all groups

  try {
    const response = await client.send(command);
    //console.log("LocalGatewayVirtualInterface raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeLocalGatewayVirtualInterfaceGroups ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}

async function describeLocalGatewayVirtualInterfaces() {
  const command = new DescribeLocalGatewayVirtualInterfacesCommand({}); // Empty input to fetch all interfaces

  try {
    const response = await client.send(command);
    //console.log("LocalGatewayVirtualInterfaces raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeLocalGatewayVirtualInterfaces ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeLocalGateways() {
  const command = new DescribeLocalGatewaysCommand({}); // Empty input to fetch all local gateways

  try {
    const response = await client.send(command);
    //console.log("LocalGateways raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeLocalGateways ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeLockedSnapshots() {
  const command = new DescribeLockedSnapshotsCommand({}); // Empty input to fetch all locked snapshots

  try {
    const response = await client.send(command);
    //console.log("LockedSnapshots raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeLockedSnapshots ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeMacHosts() {
  const command = new DescribeMacHostsCommand({}); // Empty input to fetch all MAC hosts

  try {
    const response = await client.send(command);
    //console.log("MacHosts raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeMacHosts ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeManagedPrefixLists() {
  const command = new DescribeManagedPrefixListsCommand({}); // Empty input to fetch all managed prefix lists

  try {
    const response = await client.send(command);
    //console.log("ManagedPrefixLists Raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeManagedPrefixLists ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
     logger.error("Error:", error);
    
  }
}

async function describeNatGateways() {
  const command = new DescribeNatGatewaysCommand({}); // Empty input to fetch all NAT gateways

  try {
    const response = await client.send(command);
    //console.log("NatGateways raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeNatGateways ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
     logger.error("Error:", error);
    
  }
}

async function describeNetworkAcls() {
  const command = new DescribeNetworkAclsCommand({}); // Empty input to fetch all Network ACLs

  try {
    const response = await client.send(command);
    //console.log("NetworkAcls raw response: ", JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeNetworkAcls ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
     logger.error("Error:", error);
    
  }
}

async function describeNetworkInsightsAccessScopeAnalyses() {
  const command = new DescribeNetworkInsightsAccessScopeAnalysesCommand({}); // Empty input to fetch all analyses

  try {
    const response = await client.send(command);
    //console.log("NetworkInsightsAccessScopeAnalyses raw response: ", JSON.stringify(response, null, 2));
    accumulatedOutput += `\n--- describeNetworkInsightsAccessScopeAnalyses ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
     logger.error("Error:", error);
    
  }
}


async function describeNetworkInsightsAccessScopes() {
  const command = new DescribeNetworkInsightsAccessScopesCommand({}); // Empty input to fetch all access scopes

  try {
    const response = await client.send(command);
    //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeNetworkInsightsAccessScopes ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
     logger.error("Error:", error);
     
  }
}


async function describeNetworkInsightsAnalyses() {
  const command = new DescribeNetworkInsightsAnalysesCommand({}); // Empty input to fetch all analyses

  try {
    const response = await client.send(command);
    //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeNetworkInsightsAnalyses ---\n${JSON.stringify(response, null, 2)}\n`;
  } catch (error) {
     logger.error("Error:", error);
     
  }
}


async function describeNetworkInsightsPaths() {
  const command = new DescribeNetworkInsightsPathsCommand({}); // Empty input to fetch all paths

  try {
    const response = await client.send(command);
    //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
    accumulatedOutput += `\n--- describeNetworkInsightsPaths ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
     logger.error("Error:", error);
     
  }
}

async function describeNetworkInterfaceAttributes() {
  try {
    // Step 1: List all network interfaces
    const listCommand = new DescribeNetworkInterfacesCommand({});
    const listResponse = await client.send(listCommand);

    // Step 2: Describe attributes for each network interface
    for (const networkInterface of listResponse.NetworkInterfaces) {
      const input = {
        NetworkInterfaceId: networkInterface.NetworkInterfaceId, // Required
        Attribute: "description" // Example attribute; change as needed
      };

      const command = new DescribeNetworkInterfaceAttributeCommand(input);
      const response = await client.send(command);
      //console.log(`Attributes for ${networkInterface.NetworkInterfaceId}:`, JSON.stringify(response, null, 2));
      accumulatedOutput += `\n--- describeNetworkInterfaceAttributes ---\n${JSON.stringify(response, null, 2)}\n`;

    }
  } catch (error) {
     logger.error("Error:", error);
     
  }
}

async function describeAllNetworkInterfacePermissions() {
  const input = {}; // Empty input for all network interface permissions

  const command = new DescribeNetworkInterfacePermissionsCommand(input);
  
  try {
      const response = await client.send(command);
      //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeAllNetworkInterfacePermissions ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}

async function describeAllNetworkInterfaces() {
  const input = {}; // Empty input for all network interfaces

  const command = new DescribeNetworkInterfacesCommand(input);
  
  try {
      const response = await client.send(command);
      //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeAllNetworkInterfaces ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeAllPlacementGroups() {
  const input = {}; // Empty input for all placement groups

  const command = new DescribePlacementGroupsCommand(input);
  
  try {
      const response = await client.send(command);
      //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeAllPlacementGroups ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}

async function describeAllPrefixLists() {
  const input = {}; // Empty input for all prefix lists

  const command = new DescribePrefixListsCommand(input);
  
  try {
      const response = await client.send(command);
      //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeAllPrefixLists ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describePrincipalIdFormat() {
  const input = {}; // Empty input for all principal ID formats

  const command = new DescribePrincipalIdFormatCommand(input);
  
  try {
      const response = await client.send(command);
      //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describePrincipalIdFormat ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describePublicIpv4Pools() {
  const input = {}; // Empty input to get all public IPv4 pools

  const command = new DescribePublicIpv4PoolsCommand(input);
  
  try {
      const response = await client.send(command);
      //console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describePublicIpv4Pools ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeRegions() {
  const input = { AllRegions: true }; // Set to true to get all regions

  const command = new DescribeRegionsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeRegions ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describeReservedInstances() {
  const input = {}; // No parameters to get all reserved instances

  const command = new DescribeReservedInstancesCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeReservedInstances ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeReservedInstancesModifications() {
  const input = {}; // No parameters to get all reserved instances modifications

  const command = new DescribeReservedInstancesModificationsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeReservedInstancesModifications ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeRouteTables() {
  const input = {}; // No parameters to get all route tables

  const command = new DescribeRouteTablesCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeRouteTables ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}

async function describeSecurityGroups() {
  const input = {}; // No parameters to get all security groups

  const command = new DescribeSecurityGroupsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeSecurityGroups ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeSnapshots() {
  const input = {}; // No parameters to get all snapshots

  const command = new DescribeSnapshotsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeSnapshots ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeStoreImageTasks() {
  const input = {}; // No parameters to get all store image tasks

  const command = new DescribeStoreImageTasksCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeStoreImageTasks ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeSubnets() {
    const input = {}; // No parameters to get all subnets

    const command = new DescribeSubnetsCommand(input);
    
    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
        accumulatedOutput += `\n--- describeSubnets ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error:", error);
         
    }
}



async function describeTags() {
  const input = {}; // No parameters to get all tags

  const command = new DescribeTagsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTags ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTrafficMirrorFilterRules() {
  const input = {}; // No parameters to get all traffic mirror filter rules

  const command = new DescribeTrafficMirrorFilterRulesCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTrafficMirrorFilterRules ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTrafficMirrorFilters() {
  const input = {}; // No parameters to get all traffic mirror filters

  const command = new DescribeTrafficMirrorFiltersCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTrafficMirrorFilters ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describeTrafficMirrorSessions() {
  const input = {}; // No parameters to get all traffic mirror sessions

  const command = new DescribeTrafficMirrorSessionsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTrafficMirrorSessions ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTrafficMirrorTargets() {
  const input = {}; // No parameters to get all traffic mirror targets

  const command = new DescribeTrafficMirrorTargetsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTrafficMirrorTargets ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTransitGatewayAttachments() {
  const input = {}; // No parameters to get all transit gateway attachments

  const command = new DescribeTransitGatewayAttachmentsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTransitGatewayAttachments ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTransitGatewayConnectPeers() {
  const input = {}; // No parameters to get all transit gateway connect peers

  const command = new DescribeTransitGatewayConnectPeersCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTransitGatewayConnectPeers ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTransitGatewayConnects() {
  const input = {}; // No parameters to get all transit gateway connects

  const command = new DescribeTransitGatewayConnectsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTransitGatewayConnects ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTransitGatewayMulticastDomains() {
  const input = {}; // No parameters to get all transit gateway multicast domains

  const command = new DescribeTransitGatewayMulticastDomainsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTransitGatewayConnects ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describeTransitGatewayPeeringAttachments() {
  const input = {}; // No parameters to get all transit gateway peering attachments

  const command = new DescribeTransitGatewayPeeringAttachmentsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTransitGatewayConnects ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTransitGatewayPolicyTables() {
    const input = {}; // No parameters to get all transit gateway policy tables

    const command = new DescribeTransitGatewayPolicyTablesCommand(input);
    
    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
        accumulatedOutput += `\n--- describeTransitGatewayPolicyTables ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error:", error);
         
    }
}



async function describeTransitGatewayRouteTableAnnouncements() {
  const input = {}; // No parameters to get all transit gateway route table announcements

  const command = new DescribeTransitGatewayRouteTableAnnouncementsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTransitGatewayRouteTableAnnouncements ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTransitGatewayVpcAttachments() {
  const input = {}; // No parameters to get all transit gateway VPC attachments

  const command = new DescribeTransitGatewayVpcAttachmentsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTransitGatewayVpcAttachments ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeTransitGateways() {
  const input = {}; // No parameters to get all transit gateways

  const command = new DescribeTransitGatewaysCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeTransitGateways ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeVerifiedAccessEndpoints() {
  const input = {}; // No parameters to get all verified access endpoints

  const command = new DescribeVerifiedAccessEndpointsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVerifiedAccessEndpoints ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describeVerifiedAccessGroups() {
  const input = {}; // No parameters to get all verified access groups

  const command = new DescribeVerifiedAccessGroupsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVerifiedAccessGroups ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeVerifiedAccessInstanceLoggingConfigurations() {
  const input = {}; // No parameters to get all logging configurations

  const command = new DescribeVerifiedAccessInstanceLoggingConfigurationsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVerifiedAccessInstanceLoggingConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describeVerifiedAccessInstances() {
  const input = {}; // No parameters to get all verified access instances

  const command = new DescribeVerifiedAccessInstancesCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVerifiedAccessInstances ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeVerifiedAccessTrustProviders() {
  const input = {}; // No parameters to get all verified access trust providers

  const command = new DescribeVerifiedAccessTrustProvidersCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVerifiedAccessTrustProviders ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeVolumes() {
  const input = {}; // No parameters to get all volumes

  const command = new DescribeVolumesCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVolumes ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeVolumeModifications() {
    const input = {}; // No parameters to get all volume modifications

    const command = new DescribeVolumesModificationsCommand(input);
    
    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
        accumulatedOutput += `\n--- describeVolumeModifications ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error:", error);
         
    }
}


async function describeVpcEndpointConnectionNotifications() {
  const input = {}; // No parameters for a complete request

  const command = new DescribeVpcEndpointConnectionNotificationsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVpcEndpointConnectionNotifications ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describeVpcEndpointConnections() {
  const input = {}; // No parameters to get all VPC endpoint connections

  const command = new DescribeVpcEndpointConnectionsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVpcEndpointConnections ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeVpcEndpointServiceConfigurations() {
  const input = {}; // No parameters to get all VPC endpoint service configurations

  const command = new DescribeVpcEndpointServiceConfigurationsCommand(input);
  
  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVpcEndpointServiceConfigurations ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describeVpcEndpointServices() {
  const input = {};

  const command = new DescribeVpcEndpointServicesCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVpcEndpointServices ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}


async function describeVpcEndpoints() {
  const input = {};

  const command = new DescribeVpcEndpointsCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVpcEndpoints ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describeVpcPeeringConnections() {
  const input = {};

  const command = new DescribeVpcPeeringConnectionsCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVpcPeeringConnections ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error:", error);
       
  }
}



async function describeVpcs() {
    const input = {};

    const command = new DescribeVpcsCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
        accumulatedOutput += `\n--- describeVpcs ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error:", error);
         
    }
}



async function describeVpnConnections() {
  const input = {};

  const command = new DescribeVpnConnectionsCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVpnConnections ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error: EC2: describeVpnConnections", error);
       
  }
}


async function describeVpnGateways() {
  const input = {};

  const command = new DescribeVpnGatewaysCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Log the response nicely formatted
      accumulatedOutput += `\n--- describeVpnGateways ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error: EC2: describeVpnGateways", error);
       
  }
}


async function getEbsDefaultKmsKeyId() {
  const input = {
      DryRun: false, // Set to true for a dry run (optional)
  };

  const command = new GetEbsDefaultKmsKeyIdCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify( response, null, 2)); // Logs the KMS key ID
      accumulatedOutput += `\n--- getEbsDefaultKmsKeyId ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error: EC2: getEbsDefaultKmsKeyId", error);
       
  }
}


async function getEbsEncryptionByDefault() {
  const input = {
      DryRun: false, // Set to true for a dry run (optional)
  };

  const command = new GetEbsEncryptionByDefaultCommand(input);

  try {
      const response = await client.send(command);
      console.log( JSON.stringify(response, null, 2))
      accumulatedOutput += `\n--- getEbsEncryptionByDefault ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error: EC2: getEbsEncryptionByDefault", error);
       
  }
}


async function getSerialConsoleAccessStatus() {
  const input = {}; // No parameters required

  const command = new GetSerialConsoleAccessStatusCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
      accumulatedOutput += `\n--- getSerialConsoleAccessStatus ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error: EC2: getSerialConsoleAccessStatus", error);
       

  }
}



async function getSnapshotBlockPublicAccessState() {
  const input = {}; // No parameters required

  const command = new GetSnapshotBlockPublicAccessStateCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
      accumulatedOutput += `\n--- getSnapshotBlockPublicAccessState ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error: EC2: getSnapshotBlockPublicAccessState", error);
       
  }
}


async function getVpnConnectionDeviceTypes() {
  const input = {}; // No required parameters for this command

  const command = new GetVpnConnectionDeviceTypesCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
      accumulatedOutput += `\n--- getVpnConnectionDeviceTypes ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error: EC2: getVpnConnectionDeviceTypes", error);
       
  }
}



async function listImagesInRecycleBin() {
    const input = {}; // No required parameters for this command

    const command = new ListImagesInRecycleBinCommand(input);

    try {
        const response = await client.send(command);
        console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
        accumulatedOutput += `\n--- listImagesInRecycleBin ---\n${JSON.stringify(response, null, 2)}\n`;

    } catch (error) {
         logger.error("Error: EC2: listImagesInRecycleBin", error);
         
    }
}


async function listSnapshotsInRecycleBin() {
  const input = {}; // No required parameters for this command

  const command = new ListSnapshotsInRecycleBinCommand(input);

  try {
      const response = await client.send(command);
      console.log(JSON.stringify(response, null, 2)); // Logs the full response as a formatted JSON string
      accumulatedOutput += `\n--- listSnapshotsInRecycleBin ---\n${JSON.stringify(response, null, 2)}\n`;

  } catch (error) {
       logger.error("Error: EC2: listSnapshotsInRecycleBin", error);
       
  }
}

function saveAllOutputToFile(filename) {
  fs.writeFileSync(filename, accumulatedOutput, 'utf8');
  console.log(`All output has been saved to ${filename}`);
}

async function main() {
  const functionsToExecute = [
    describeAccountAttributes,
    getAvailabilityZones,
    describeintancetype,
    describeinstances,
    describeinternetgateways,
    IpamByoasn,
    describeIpamTokens,
    describeIpamPools,
    describeIpamResourceDiscoveries,
    describeIpamResourceDiscoveryAssociations,
    describeIpamScopes,
    describeIpams,
    describeIpv6Pools,
    describeKeyPairs,
    describeLaunchTemplates,
    describeLocalGatewayRouteTableVirtualInterfaceGroupAssociations,
    describeLocalGatewayRouteTableVpcAssociations,
    describeLocalGatewayRouteTables,
    describeLocalGatewayVirtualInterfaceGroups,
    describeLocalGatewayVirtualInterfaces,
    describeLocalGateways,
    describeLockedSnapshots,
    describeMacHosts,
    describeManagedPrefixLists,
    describeNatGateways,
    describeNetworkAcls,
    describeNetworkInsightsAccessScopeAnalyses,
    describeNetworkInsightsAccessScopes,
    describeNetworkInsightsAnalyses,
    describeNetworkInsightsPaths,
    describeNetworkInterfaceAttributes,
    describeAllNetworkInterfacePermissions,
    describeAllNetworkInterfaces,
    describeAllPlacementGroups,
    describeAllPrefixLists,
    describePrincipalIdFormat,
    describePublicIpv4Pools,
    describeRegions,
    describeReservedInstances,
    describeReservedInstancesModifications,
    describeRouteTables,
    describeSecurityGroups,
    describeSnapshots,
    describeStoreImageTasks,
    describeSubnets,
    describeTags,
    describeTrafficMirrorFilterRules,
    describeTrafficMirrorFilters,
    describeTrafficMirrorSessions,
    describeTrafficMirrorTargets,
    describeTransitGatewayAttachments,
    describeTransitGatewayConnectPeers,
    describeTransitGatewayConnects,
    describeTransitGatewayMulticastDomains,
    describeTransitGatewayPeeringAttachments,
    describeTransitGatewayPolicyTables,
    describeTransitGatewayRouteTableAnnouncements,
    describeTransitGatewayVpcAttachments,
    describeTransitGateways,
    describeVerifiedAccessEndpoints,
    describeVerifiedAccessGroups,
    describeVerifiedAccessInstanceLoggingConfigurations,
    describeVerifiedAccessInstances,
    describeVerifiedAccessTrustProviders,
    describeVolumes,
    describeVolumeModifications,
    describeVpcEndpointConnectionNotifications,
    describeVpcEndpointConnections,
    describeVpcEndpointServiceConfigurations,
    describeVpcEndpointServices,
    describeVpcEndpoints,
    describeVpcPeeringConnections,
    describeVpcs,
    describeVpnConnections,
    describeVpnGateways,
    getEbsDefaultKmsKeyId,
    getSerialConsoleAccessStatus,
    getSnapshotBlockPublicAccessState,
    getVpnConnectionDeviceTypes,
    listImagesInRecycleBin,
    listSnapshotsInRecycleBin,
  ];

  for (const func of functionsToExecute) {
    try {
      await func(); // Await the function call
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
      //logger.error(`Error executing ${func.name}: ${JSON.stringify(error, null, 2)}`);
    }
  }
  saveAllOutputToFile('EC2.txt');
}

main();
