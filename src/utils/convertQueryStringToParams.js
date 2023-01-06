export const convertQueryStringToParams = (queryString) => {
  const params = new URLSearchParams(queryString);

  const queryParams = {};

  params.forEach((value, key) => {
    if (queryParams[key]) {
      if (Array.isArray(queryParams[key])) {
        queryParams[key] = [...queryParams[key], decodeURIComponent(value)];
      } else {
        queryParams[key] = [queryParams[key], decodeURIComponent(value)];
      }
    } else {
      queryParams[key] = decodeURIComponent(value);
    }
  });

  return queryParams;
};
