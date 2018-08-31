# Spotinst SDK Node.js

A Node.js client library for accessing the Spotinst API.

You can view Spotinst API docs [here](https://api.spotinst.com/).

## Installation

```javascript
npm install spotinst-sdk-nodejs --save
```

## Usage

```javascript
import { Client, config } from 'spotinst-sdk-nodejs';
```

Create a new Spotinst client, then use the exposed services to
access different parts of the Spotinst API.

### Authentication

```javascript
import { Client, config } from 'spotinst-sdk-nodejs';

// Instantiate new client.
const clientOpts = [
  config.setToken('foo'),
];
const client = new Client(...clientOpts);
```

## Callback or Promise?

All methods in the SDK provide both callback based as well as promise based interactions.
If you want to use callback just pass it as a last parameter. For example:

```javascript
client.AwsGroupService.read({id: 'sig-bar'}, (err, groups) => {
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
client.AwsGroupService.read({id: 'sig-bar'})
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
var spotinst = require('spotinst-sdk-nodejs');

// Instantiate new client.
var client = new spotinst.Client(
  spotinst.config.setToken('foo'),
);

client.AwsGroupService.read({id: 'sig-bar'}, (err, groups) => {
  if (err) {
    console.error(err);
    // Do something with err.
    return;
  }

  console.log(groups);
  // Do something with groups.
});
```

## Documentation

For a comprehensive list of examples, check out the [API documentation](https://api.spotinst.com/).

## Contributing

We love pull requests! Please see the [contribution guidelines](CONTRIBUTING.md).
