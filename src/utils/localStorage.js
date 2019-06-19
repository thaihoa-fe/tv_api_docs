import { useState } from 'react';

export const loadData = keyName => {
  try {
    const serializedState = localStorage.getItem(keyName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveData = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error(error);
  }
};

export const removeData = key => {
  localStorage.removeItem(key);
};

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => loadData(key) || initialValue);

  const setValue = value => {
    const valueToStore = typeof value === 'function' ? value(storedValue) : value;

    setStoredValue(valueToStore);
    saveData(key, valueToStore);
  };

  return [storedValue, setValue];
};
