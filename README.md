# Spotinst SDK Go

The official Spotinst SDK for the Node.js programming language.

## Contents

- [Installation](#installation)
- [Authentication](#authentication)
- [Callback or Promise?](#callback-or-promise)
- [ES5](#es5)
- [Services](#services)
- [Documentation](#documentation)
- [Examples](#examples)
- [Getting Help](#getting-help)
- [Community](#community)
- [Contributing](#contributing)
- [License](#license)

## Installation

```javascript
npm install spotinst-sdk-nodejs --save
```

## Authentication

```javascript
import { Client, config } from "spotinst-sdk-nodejs";
```

Create a new Spotinst client, then use the exposed services to
access different parts of the Spotinst API.

```javascript
import { Client, config } from "spotinst-sdk-nodejs";

// Instantiate new client.
const clientOpts = [config.setToken("foo"), config.setAccount("act-XXXXXX")];
const client = new Client(...clientOpts);
```

## Callback or Promise?

All methods in the SDK provide both callback based as well as promise based interactions.
If you want to use callback just pass it as a last parameter. For example:

```javascript
client.AwsGroupService.read({ id: "sig-bar" }, (err, groups) => {
	if (err) {
		console.error(err);
		// Do something with err.
		return;
	}

	console.log(groups);
	// Do something with groups.
});
```

If you prefer to use promises then the code goes like this:

```javascript
client.AwsGroupService.read({ id: "sig-bar" })
	.then((groups) => {
		console.log(groups);
		// Do something with groups.
	})
	.catch((err) => {
		console.error(err);
		// Do something with err.
	});
```

## ES5

If you prefer to use ES5 syntax instead of ES6 then the code goes like this:

```javascript
var spotinst = require("spotinst-sdk-nodejs");

// Instantiate new client.
var client = new spotinst.Client(spotinst.config.setToken("foo"));

client.AwsGroupService.read({ id: "sig-bar" }, (err, groups) => {
	if (err) {
		console.error(err);
		// Do something with err.
		return;
	}

	console.log(groups);
	// Do something with groups.
});
```

## Services

Services and actions are formatted as `client.SERVICE.ACTION()`.

```javascript
client.AwsGroupService.list()
	.then((groups) => {
		console.log(groups);
		// do something with groups
	})
	.catch((err) => {
		console.error(err);
		// do something with err
	});
```

## Documentation

For a comprehensive documentation, check out the [API documentation](https://help.spot.io/).

## Examples

For a list of examples, check out the [examples](/examples) directory.

## Getting Help

We use GitHub issues for tracking bugs and feature requests. Please use these community resources for getting help:

- Ask a question on [Stack Overflow](https://stackoverflow.com/) and tag it with [spotinst-sdk-nodejs](https://stackoverflow.com/questions/tagged/spotinst-sdk-nodejs/).
- Join our Spotinst community on [Slack](http://slack.spot.io/).
- Open an [issue](https://github.com/spotinst/spotinst-sdk-nodejs/issues/new/).

## Community

- [Slack](http://slack.spot.io/)
- [Twitter](https://twitter.com/spot_hq/)

## Contributing

Please see the [contribution guidelines](CONTRIBUTING.md).

## License

Code is licensed under the [Apache License 2.0](LICENSE). See [NOTICE.md](NOTICE.md) for complete details, including software and third-party licenses and permissions.
