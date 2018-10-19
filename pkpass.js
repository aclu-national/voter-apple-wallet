const fs = require('fs');
const yaml = require('yaml').default;
const { Template } = require('@destinationstransfers/passkit');
const base_dir = '/usr/local/aclu/voter-apple-wallet';

(async () => {

	try {

		if (process.argv.length < 7) {
			console.log('Usage: node pkpass.js [hash] [address] [hours] [lat] [lng]');
			process.exit(1);
		}

		const hash = process.argv[2];
		const address = process.argv[3];
		const hours = process.argv[4];
		const lat = process.argv[5];
		const lng = process.argv[6];

		const template = await Template.load(`${base_dir}/passes/${hash}`, 'safeandfree');
		var pass = template.createPass({
			serialNumber: "1",
			description: "ACLU Voter"
		});

		const content = {
			secondary: [
				{ 'Polling Place Address': address }
			],
			auxiliary: [
				{ 'Hours': hours },
				{ 'Learn More': 'aclu.org/voter' }
			],
			backFields: [
				{ 'Polling Place Address': address },
				{ 'Polling Place Hours': hours }
			]
		};

		if (content.locations) {
			//console.log('Adding locations:');
			//console.log(content.locations);
			pass.fields.locations = content.locations;
		}

		var num = 0;
		if (content.primary) {
			for (let item of content.primary) {
				num++;
				//console.log(`primary: ${item}`);
				pass.primaryFields.add('primary' + num, 'this is ignored', item);
			}
		}

		num = 0;
		if (content.secondary) {
			for (let item of content.secondary) {
				num++;
				for (let key in item) {
					//console.log(`secondary ${key}: ${item[key]}`);
					pass.secondaryFields.add('secondary' + num, key, item[key]);
				}
			}
		}

		num = 0;
		if (content.auxiliary) {
			for (let item of content.auxiliary) {
				num++;
				for (let key in item) {
					//console.log(`auxiliary ${key}: ${item[key]}`);
					pass.auxiliaryFields.add('auxiliary' + num, key, item[key]);
				}
			}
		}

		num = 0;
		if (content.backFields) {
			for (let item of content.backFields) {
				num++;
				for (let key in item) {
					//console.log(`backFields ${key}: ${item[key]}`);
					pass.backFields.add('backFields' + num, key, item[key]);
				}
			}
		}

		pass.fields.relevantDate = "2018-11-06T10:00-04:00";

		let file = fs.createWriteStream(`${base_dir}/passes/${hash}/pass.pkpass`);
		pass.on("error", function(err) {
			console.log(err.stack);
			process.exit(1);
		});
		pass.pipe(file);

	} catch(err) {
		console.log(err.stack);
	}

})();
