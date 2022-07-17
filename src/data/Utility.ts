export const getValueByPath = (entry: any, path: string[]): {} | undefined => {
  let current = entry;
  for (const key of path) {
    current = current[key];

    if (current == undefined) {
      return undefined;
    }
  }

  return current;
};