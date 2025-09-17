function myGet(object, path, defaultValue) {
  if (object == null) {
    return defaultValue;
  }

  const pathArray = Array.isArray(path) ? path : String(path).split('.') || [];

  let result = object;

  for (const key of pathArray) {
    result = Object(result)[key];
    if (result === undefined) {
      return defaultValue;
    }
  }

  return result;
}
