function TruncateText(string, number) {
  let textToTruncate = string;

  if (textToTruncate.endsWith('(ensemble version)')) {
    textToTruncate = textToTruncate.replace(/(\(ensemble version\))/, '');
  }

  if (textToTruncate.endsWith('(ensemble)')) {
    textToTruncate = textToTruncate.replace(/(\(ensemble\))/, '');
  }

  if (textToTruncate.length > number) {
    (textToTruncate = `${textToTruncate.substring(0, number - 1)}...`);
    return textToTruncate;
  }
  return textToTruncate;
}

export default TruncateText;
