'use client';

import { Button, Input } from 'antd';

export default function LoginPage() {
  return (
    <div className='max-w-[543px] w-full font-sans font-bold mt-[104px]'>
      <div className='text-xl leading-[30px] text-center mt-16'>Administrator Login</div>
      <div className='flex text-base leading-[25.6px] w-full justify-between mt-8'>
        <div className='max-w-[373px] w-full max-h-[138px] h-auto flex flex-col justify-between gap-4'>
          <div>
            <Input type='text' name='username' className='!max-w-[298px] !w-full !h-[48px]' />
          </div>
          <div>
            <Input type='password' name='password' className='!max-w-[298px] !w-full !h-[48px]' />
          </div>
        </div>
        <Button className='!w-[146px] !h-auto flex justify-center !text-lg' htmlType='submit' />
      </div>
      <div className='text-sm leading-[22.4px] text-center mt-12'>
        Please contact the administrator to find your ID and password.
      </div>
    </div>
  );
}
