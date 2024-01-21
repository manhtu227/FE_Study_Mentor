import Catalog from '@assets/icons/catalog';
import Logo from '@components/logo/Logo';
import { Button, Menu } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import MenuItem from 'antd/es/menu/MenuItem';
import React from 'react';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className='h-[100px] min-h-[100px] w-full items-center'>
      <nav className='flex h-full w-full items-center px-[44px] py-[10px] dark:bg-white'>
        {/* <div className='flex h-full w-2/3 items-center gap-8'>
          <Logo title='Study Mentor' />
          <ButtonGroup className='gap-8'>
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className='flex items-center gap-2 text-base font-bold capitalize capitalize text-darkBlue'
            >
              <Catalog />
              Danh mục
            </Button>
            <Menu id='basic-menu'>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <Button className='text-base font-bold capitalize text-darkBlue '>
              Dành cho người hướng dẫn
            </Button>
            <Button className='text-base font-bold capitalize text-darkBlue'>
              Dành cho học viên
            </Button>
          </ButtonGroup>
        </div>
        <div className='flex w-1/3 items-center justify-end gap-8'>
          <Button className='rounded-3xl border px-10 py-3 text-base font-bold capitalize text-lightBlue'>
            Đăng nhập
          </Button>
          <Button className='rounded-3xl border bg-lightBlue px-10 py-3 text-base font-bold capitalize text-white hover:bg-lightBlue hover:opacity-90'>
            Đăng ký
          </Button>
        </div> */}
      </nav>
    </header>
  );
}

export default Header;
