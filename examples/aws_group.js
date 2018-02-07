import { Client, config } from 'spotinst-sdk-nodejs';

const client = new Client(...[
  config.setToken('foo'),
]);

client.AwsGroupService.list()
  .then((groups) => {
    console.log(groups);
    // do something with groups
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });

client.AwsGroupService.read({id: 'sig-foo'})
  .then((groups) => {
    console.log(groups);
    // do something with groups
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });

client.AwsGroupRollService.list({groupId: 'sig-foo'})
  .then((rolls) => {
    console.log(rolls);
    // do something with rolls
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });

client.AwsGroupRollService.read({groupId: 'sig-foo', rollId: 'sbgd-bar'})
  .then((rolls) => {
    console.log(rolls);
    // do something with rolls
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });