import { useEffect, useState } from "react";
import { Moment } from "moment";

export interface Work {
  id: string;
  name: string;
  shortdescription: string;
  description: string;
  image: string;
  url: string;
  languages: string[];
  participants: string[];
}

export interface Blog {
  title: string;
  date: Moment;
  content: string;
}

export interface Result {
  about: {
    details: {
      name: string;
      age: Moment;
      city: string;
      email: string;
      github: string;
      linkedin: string;
      image: string[];
    };
    misc: {
      bio: string;
      introdescription: string;
      description: string[];
      important: string;
      skills: string[];
    };
  };
  work: Work[];
  blog: Blog[];
}

export function useFetch(): Result | null {
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => {
    fetch("/klara.json")
      .then((response) => response.json())
      .then((result) => {
        setResult(result);
      });
  }, []);

  return result;
}
