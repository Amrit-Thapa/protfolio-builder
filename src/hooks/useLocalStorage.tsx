import {Section} from "@/types";
import {useState, Dispatch, SetStateAction} from "react";

type LocalStore<T> = {
  initialData: T;
  updates: T;
  setUpdates: Dispatch<SetStateAction<T>>;
  storeAllData: (key: Section, value: any) => void;
};

const isBrowser = typeof window !== "undefined";
const storage = isBrowser ? window.localStorage : null;

const useLocalStorage = <T,>(key: Section, initialValue: T): LocalStore<T> => {
  const getCurrentData = (): T => {
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
  };

  const storeAllData = (key: Section, value: any) => {
    try {
      if (isBrowser && storage) {
        storage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error storing data to localStorage:", error);
    }
  };

  const [data] = useState<T>(getCurrentData());
  const [updates, setUpdates] = useState<T>(data);

  return {initialData: data, updates, setUpdates, storeAllData};
};

export default useLocalStorage;
