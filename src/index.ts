import {Sentence} from './language/Sentence';

export const parse = (str: string): boolean => {
  const s = new Sentence();

  return s.parse(str);
};
