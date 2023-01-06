export const convertQueryParamsToFlatArray = (queryParams) => {
  const flatArray = [];

  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];

    // if value is an array, push each value in the array
    if (Array.isArray(value)) {
      queryParams[key].forEach((val) => {
        flatArray.push([key, encodeURIComponent(val)]);
      });
    } else {
      flatArray.push([key, encodeURIComponent(value)]);
    }
  });

  return flatArray.sort((a, b) => a[0].localeCompare(b[0]));
};
