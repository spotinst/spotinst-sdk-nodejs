import { Client, config } from 'spotinst-sdk-nodejs';

const client = new Client(...[
  config.setToken('foo'),
]);

client.AwsInstanceService.read({id: 'i-foo'})
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
        'i-foo',
    ],
    shouldTerminateInstances: true,
    shouldDecrementTargetCapacity: true,
    drainingTimeout: 300,
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });

client.AwsInstanceService.signal({
    instanceId: 'i-foo',
    signal: 'INSTANCE_READY',
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });
