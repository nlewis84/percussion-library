export const stripLeadingQuestionMarkFromSearch = (search) => {
  if (search.startsWith('?')) {
    return search.slice(1);
  }

  return search;
};
