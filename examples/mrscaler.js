var spotinst = require("spotinst-sdk-nodejs");

const clientOpts = [];

// Instantiate new client.
var client = new spotinst.Client(...clientOpts);

let emrJson = {
  mrScaler: {
    name: "kevin-emr-test",
    description: "Kevin EMR test for nodejs sdk",
    region: "us-west-2",
    strategy: {
      new: {
        releaseLabel: "emr-5.20.0"
      }
    },
    compute: {
      availabilityZones: [
        {
          name: "us-west-2a",
          subnetId: "subnet-02297335338642"
        },
        {
          name: "us-west-2b",
          subnetId: "subnet-0cb5a07e1df98b"
        }
      ],
      instanceGroups: {
        masterGroup: {
          instanceTypes: ["m4.large"],
          target: 1,
          lifeCycle: "ON_DEMAND"
        },
        coreGroup: {
          instanceTypes: ["m4.large"],
          capacity: {
            target: 1,
            minimum: 1,
            maximum: 1,
            unit: "instance"
          },
          lifeCycle: "SPOT"
        },
        taskGroup: {
          instanceTypes: ["m4.large"],
          capacity: {
            target: 1,
            minimum: 1,
            maximum: 1,
            unit: "instance"
          },
          lifeCycle: "SPOT"
        }
      },
      ec2KeyName: "kevin",
      emrManagedMasterSecurityGroup: "sg-8cfb4654",
      emrManagedSlaveSecurityGroup: "sg-f2f94987"
    },
    scheduling: {},
    scaling: {},
    coreScaling: {}
  }
};

client.MrScalerAwsService.create(emrJson)
  .then(mrscalers => {
    console.log(mrscalers);
    // do something with groups
  })
  .catch(err => {
    console.error(err);
    // do something with err
  });

client.MrScalerAwsService.list()
  .then(mrscalers => {
    console.log(mrscalers);
    // do something with groups
  })
  .catch(err => {
    console.error(err);
    // do something with err
  });

client.MrScalerAwsService.delete({ id: "simrs-d4b3b432" })
  .then(mrscalers => {
    console.log(mrscalers);
    // do something with groups
  })
  .catch(err => {
    console.error(err);
    // do something with err
  });
