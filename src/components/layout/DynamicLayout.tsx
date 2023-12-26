import { PropsWithChildren } from 'react';

import Header from './Header';

export default function DynamicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
