/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
function TruncateText(string, number) {
	if (string.endsWith('(ensemble version)')) {
		string = string.replace(/(\(ensemble version\))/, '');
	}

	if (string.endsWith('(ensemble)')) {
		string = string.replace(/(\(ensemble\))/, '');
	}

	return string.length > number
		? (string = `${string.substring(0, number - 1)}...`)
		: string;
}

export default TruncateText;
