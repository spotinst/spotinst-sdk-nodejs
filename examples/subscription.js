import { Client, config } from 'spotinst-sdk-nodejs';

const client = new Client(...[
  config.setToken('foo'),
]);

client.SubscriptionService.list()
  .then((subscriptions) => {
    console.log(subscriptions);
    // do something with subscriptions
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });

client.SubscriptionService.read({id: 'sis-0398a446'})
  .then((subscriptions) => {
    console.log(subscriptions);
    // do something with subscriptions
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });