const fs = require('fs');
const yaml = require('yaml').default;
const { Template } = require('@destinationstransfers/passkit');

(async () => {

	const template = await Template.load('./template', 'safeandfree');
	var pass = template.createPass({
		serialNumber: "1",
		description: "ACLU Voter"
	});

	var file = fs.readFileSync('./content.yaml', 'utf8');
	const content = yaml.parse(file);

	if (content.locations) {
		console.log('Adding locations:');
		console.log(content.locations);
		pass.fields.locations = content.locations;
	}

	var num = 0;
	if (content.primary) {
		for (let item of content.primary) {
			num++;
			console.log(`primary: ${item}`);
			pass.primaryFields.add('primary' + num, 'this is ignored', item);
		}
	}

	num = 0;
	if (content.secondary) {
		for (let item of content.secondary) {
			num++;
			for (let key in item) {
				console.log(`secondary ${key}: ${item[key]}`);
				pass.secondaryFields.add('secondary' + num, key, item[key]);
			}
		}
	}

	num = 0;
	if (content.auxiliary) {
		for (let item of content.auxiliary) {
			num++;
			for (let key in item) {
				console.log(`auxiliary ${key}: ${item[key]}`);
				pass.auxiliaryFields.add('auxiliary' + num, key, item[key]);
			}
		}
	}

	num = 0;
	if (content.backFields) {
		for (let item of content.backFields) {
			num++;
			for (let key in item) {
				console.log(`backFields ${key}: ${item[key]}`);
				pass.backFields.add('backFields' + num, key, item[key]);
			}
		}
	}

	pass.fields.relevantDate = "2018-09-26T10:00-04:00";

	console.log(pass.fields);

	file = fs.createWriteStream("pass.pkpass");
	pass.on("error", function(error) {
		console.error(error);
		process.exit(1);
	})
	pass.pipe(file);

})();
