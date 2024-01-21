import React from 'react';
import LogoIcon from '@assets/icons/logo';
import clsx from 'clsx';
import { CircularXXWebBook } from '@assets/fonts/fonts';

function Logo({ size, title }: { size?: string; title: string }) {
  console.log('LogoIcon', LogoIcon);
    return (
              <div className='flex h-full items-center'>
                              <LogoIcon
                      className={clsx({
                          'h-[32px] w-[34px]': !size,
                          'h-[10px] w-[10px]': size === 'sm',
                          'mr-3': true,
                      })}
                  />
                  <div className={`text-2xl font-bold text-[#5BB9E2] ${CircularXXWebBook.className}`}>
                {title}
            </div>
        </div>
    );
}

export default Logo;
