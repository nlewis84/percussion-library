import { convertQueryParamsToFlatArray } from './convertQueryParamsToFlatArray';

export const getQueryStringFromParams = (queryParams) => {
  const flattenedParams = convertQueryParamsToFlatArray(queryParams);

  return flattenedParams
    .map((param) => param.join('='))
    .join('&');
};
