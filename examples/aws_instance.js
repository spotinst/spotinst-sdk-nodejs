import { Client, config } from 'spotinst-sdk-nodejs';

const client = new Client(...[
  config.setToken('foo'),
]);

client.AwsInstanceService.read({id: 'i-12345abcd'})
  .then((instances) => {
    console.log(instances);
    // do something with instances
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });

client.AwsInstanceService.detach({
    instancesToDetach: [
        'i-12345abcd',
    ],
    shouldTerminateInstances: true,
    shouldDecrementTargetCapacity: true,
    drainingTimeout: 300,
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });
