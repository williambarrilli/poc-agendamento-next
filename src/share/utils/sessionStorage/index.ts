export const setSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key: string) => {
  const value = sessionStorage.getItem(key);
  if (value) return JSON.parse(value);
  return undefined;
};
