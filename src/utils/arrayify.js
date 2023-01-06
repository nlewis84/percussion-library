export const arrayify = (value) => {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
};
