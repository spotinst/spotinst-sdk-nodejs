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