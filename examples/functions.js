import { Client, config } from 'spotinst-sdk-nodejs';

const client = new Client(...[
  config.setToken('foo'),
]);

client.FunctionsService.read({id: 'i-12345abcd', environmentId: "env-1234"})
  .then((instances) => {
    console.log(instances);
    // do something with instances
  })
  .catch((err) => {
    console.error(err);
    // do something with err
  });


client.FunctionsService.list({environmentId: "env-1234"})
	.then((instances) => {
		console.log(instances);
		// do something with instances
	})
	.catch((err) => {
		console.error(err);
		// do something with err
	});


client.FunctionsService.create({environmentId: "env-1234"})
	.then((instances) => {
		console.log(instances);
		// do something with instances
	})
	.catch((err) => {
		console.error(err);
		// do something with err
	});
