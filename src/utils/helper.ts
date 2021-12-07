import { Children, ReactNode, ReactNodeArray } from 'react';

export function nodeToArray(node: ReactNode): ReactNodeArray {
  return Children.toArray(node);
}
