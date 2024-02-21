import {Section} from "@/types";
import {useState, useEffect, Dispatch, SetStateAction} from "react";

const useLocalStorage = <T,>(
  key: Section,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  // Retrieve the initial value from localStorage if it exists, otherwise use the initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error storing data to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
