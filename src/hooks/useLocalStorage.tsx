import {Section} from "@/types";
import {useState, Dispatch, SetStateAction} from "react";

type LocalStore<T> = {
  initialData: T | undefined;
  updates: T;
  setUpdates: Dispatch<SetStateAction<T>>;
  storeAllData: (key: Section, value: any) => void;
};

const isBrowser = typeof window !== "undefined";
const storage = isBrowser ? window.localStorage : null;

const useLocalStorage = <T,>(key: Section, initialValue: T): LocalStore<T> => {
  const getCurrentData = (): T | undefined => {
    try {
      if (isBrowser && storage) {
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      } else {
        return undefined;
      }
    } catch (error) {
      return undefined;
    }
  };

  const storeAllData = (key: Section, value: any) => {
    try {
      if (isBrowser && storage) {
        // storage.setItem(key, JSON.stringify(value));
        setData(value);
      }
    } catch (error) {
      console.error("Error storing data to localStorage:", error);
    }
  };

  const [data, setData] = useState<T | undefined>(getCurrentData());
  const [updates, setUpdates] = useState<T>(data || initialValue);

  return {initialData: data, updates, setUpdates, storeAllData};
};

export default useLocalStorage;
