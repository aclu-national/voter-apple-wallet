# voter-apple-wallet

A command-line utility for generating Apple Wallet passes for ACLU Voter.

## Installation

```
$ npm install
```

## Template

The `template` folder contains all the files used to generate the pass, including a demo .pem key and `pass.json`. Edit `pass.json` to experiment with alternate pass types:

```
"eventTicket": {
	"primaryFields": [],
	"secondaryFields": [],
	"auxiliaryFields": []
}
```

See also: [Pass Design and Creation](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html#//apple_ref/doc/uid/TP40012195-CH4-SW1)

## Content

To adjust the contents of the pass, edit `content.yaml`.

## Usage

```
$ node pkpass.js
```

That will generate a new file called `pass.pkpass` that you can drag and drop onto the iOS Simulator app to view.
