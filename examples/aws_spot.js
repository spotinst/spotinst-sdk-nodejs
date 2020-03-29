import { Client, config } from "spotinst-sdk-nodejs";

const client = new Client(...[config.setToken("foo")]);

client.AwsSpotService.read({ id: "sir-foo" })
  .then(spots => {
    console.log(spots);
    // do something with spots
  })
  .catch(err => {
    console.error(err);
    // do something with err
  });
