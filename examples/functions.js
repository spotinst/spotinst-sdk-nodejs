import { Client, config } from "spotinst-sdk-nodejs";

const client = new Client(...[config.setToken("foo")]);

client.FunctionsService.read({ id: "i-foo", environmentId: "env-1234" })
  .then(functions => {
    console.log(functions);
    // do something with functions
  })
  .catch(err => {
    console.error(err);
    // do something with err
  });

client.FunctionsService.list({ environmentId: "env-1234" })
  .then(functions => {
    console.log(functions);
    // do something with functions
  })
  .catch(err => {
    console.error(err);
    // do something with err
  });

client.FunctionsService.create({ environmentId: "env-1234" })
  .then(functions => {
    console.log(functions);
    // do something with functions
  })
  .catch(err => {
    console.error(err);
    // do something with err
  });
