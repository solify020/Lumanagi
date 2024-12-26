export const urlToJson = (query: string) => {
  const urlParams: any = new URLSearchParams(query);
  const queryObject: any = {};

  for (const [key, value] of urlParams.entries()) {
    queryObject[key] = value;
  }

  // Now you have the query parameters in the queryObject as key-value pairs
  return queryObject;
};
