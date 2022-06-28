import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { BookMarkData, getValue, isValidURL } from './Utils';

const dataPath = join(__dirname, '../bookmarkData.json');

const args = process.argv.slice(2);
const command = args.shift()?.toLowerCase();
let data: BookMarkData[] = existsSync(dataPath) ? require(dataPath) : [];

async function main() {
	if(command === 'add' || command === 'a') {
		let name = args[0] ?? await getValue('Please enter the name of the bookmark: ');
		name = name.trim();

		let url = args[1] ?? await getValue('Please enter page you want to save: ');
		url = url.trim();
		if(!isValidURL(url)) return console.log('Invalid URL provided');

		let reason = args[2] ?? await getValue('Please enter the reason for which you want to save it(press enter to skip): ');
		reason = reason.trim();

		data.push({
			id: data.length,
			name,
			url,
			reason,
			timestamp: Date.now(),
		});

		writeFileSync(dataPath, JSON.stringify(data, null, "\t"));

		console.log(`\nAdded bookmark with name "${name}", url "${url}" and reason "${reason}"`);
	}
	else if(command === 'search' || command === 'find' || command === 'f' || command === 's') {}
	else if(command === 'delete' || command === 'remove' || command === 'd' || command === 'r') {}
	else {}
}

main();