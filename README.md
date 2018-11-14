# voter-apple-wallet

A command-line utility for generating Apple Wallet passes for [ACLU Voter](https://www.aclu.org/voter/).

## Installation

The script relies on [a fork](https://github.com/destinationstransfers/passkit) of [node-passbook](https://github.com/busbud/node-passbook) to generate `.pkpass` files. It expects to run on Node v10 on Ubuntu 16.04.

```
$ npm install
```

[ImageMagick](https://en.wikipedia.org/wiki/ImageMagick) is used to add a pin icon to the map.

```
$ sudo apt update
$ sudo apt install -y imagemagick
```

## Mapbox API key

The map on the pass comes from the [Mapbox Static API](https://www.mapbox.com/api-documentation/#static). You'll need to create an API token and define it as an environment variable.

```
$ export MAPBOX_API_KEY="..."
```

## Apple Developer setup

You will need an active Apple Developer account to generate passes.

1. [Create a Pass Type Identifier](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/YourFirst.html#//apple_ref/doc/uid/TP40012195-CH2-SW1)
2. Set the `teamIdentifier` and `passTypeIdentifier` in `template/pass.json`
3. [Get your certificates](https://github.com/destinationstransfers/passkit#get-your-certificates) and place a `[Pass Type ID].pem` file into the `template` folder (e.g., `template/org.aclu.voter.pem`)

## Usage

Use the included shell script to invoke the pass generator.

```
$ pkpass.sh [address] [hours] [lat] [lng]
```

That will generate a new file called `pass.pkpass` that you can drag and drop onto the iOS Simulator app to view.

## Template

The `template` folder contains all the files used to generate the pass. Edit `pass.json` to experiment with alternate pass types and default content:

```
"eventTicket": {
	"primaryFields": [],
	"secondaryFields": [],
	"auxiliaryFields": []
}
```

# See also

* [ACLU Elections API](https://github.com/aclu-national/elections-api)
* [Pass Design and Creation](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html#//apple_ref/doc/uid/TP40012195-CH4-SW1)
* [Fast Company: The ACLU launches a clever UX hack for midterm voting](https://www.fastcompany.com/90258411/the-aclu-launches-a-clever-ux-hack-for-midterm-voting)
