import {Section} from "@/types";
import {useState, useEffect, Dispatch, SetStateAction} from "react";

const useLocalStorage = <T,>(
  key: Section,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const isBrowser = typeof window !== "undefined";
  const storage = isBrowser ? window.localStorage : null;
  // Retrieve the initial value from localStorage if it exists, otherwise use the initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (isBrowser && storage) {
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (isBrowser && storage) {
        storage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error("Error storing data to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
