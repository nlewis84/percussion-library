function TruncateText(string, number, name = false) {
  let textToTruncate = string;

  if (textToTruncate.endsWith('(ensemble version)')) {
    textToTruncate = textToTruncate.replace(/(\(ensemble version\))/, '');
  }

  if (textToTruncate.endsWith('(ensemble)')) {
    textToTruncate = textToTruncate.replace(/(\(ensemble\))/, '');
  }

  if (name && string.split(' ').length > 1) {
    // exclude Jr. and III
    if (string === 'Moore III') {
      textToTruncate = string;

      return textToTruncate;
    }

    if (string.endsWith('Jr.')) {
      textToTruncate = `${string.split(' ').at(-2)} ${string.split(' ').at(-1)}`;

      return textToTruncate;
    }

    textToTruncate = string.split(' ').at(-1);

    return textToTruncate;
  }

  if (textToTruncate.length > number) {
    (textToTruncate = `${textToTruncate.substring(0, number - 1)}...`);
    return textToTruncate;
  }
  return textToTruncate;
}

export default TruncateText;
