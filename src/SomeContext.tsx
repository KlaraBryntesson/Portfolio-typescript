import { createContext } from 'react';
import type { Work } from './useFetch';
import { Moment } from 'moment';

interface Details {
  name: string;
  age: Moment;
  city: string;
  email: string;
  github: string;
  linkedin: string;
  image: string[];
}

export interface Blog {
  title: string;
  date: Moment;
  content: string;
}

export interface SomeContextValue {
  details?: Details;
  misc?: {
    bio: string;
    introdescription: string;
    description: string[];
    important: string;
    skills: string[];
  };
  work?: Work[];
  blog?: Blog[];
  loggedIn: boolean;
  setLoggedIn: SetLoggedInFunction;
  theme: string;
  setTheme: SetThemeFunction;
}

type SetThemeFunction = (newValue: string) => void;
type SetLoggedInFunction = (newValue: boolean) => void;

export const SomeContext = createContext<SomeContextValue | null>(null);
