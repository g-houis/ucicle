import React, { ReactNode } from 'react';

type Props = {
  conditions: boolean[]
  children: ReactNode
};

export default function Conditional({ conditions, children }: Props) {
  if (!conditions.includes(false)) {
    return (<>{ children }</>);
  }
  return (<></>);
}
