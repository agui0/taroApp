import { createContext } from 'react';

export type tableContentType = {
  labelWidth?: number;
  invalidNames?: string[];
}
const formContent = createContext<tableContentType | undefined>(undefined);

export default formContent;