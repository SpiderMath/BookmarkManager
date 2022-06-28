import { createInterface } from 'readline';

export interface BookMarkData {
	id: number,
	name: string,
	url: string,
	reason: string,
}

export async function getValue(question: string): Promise<string> {
	return new Promise((resolve) => {
		const readline = createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readline.question(question, (answer) => {
			resolve(answer);
			readline.close();
		});
	});
}

export function isValidURL(url: string): boolean {
	if(
		!url.startsWith('http') || url.split('://').length !== 2 || url.split('.').length === 1
	) return false;

	return true;
}