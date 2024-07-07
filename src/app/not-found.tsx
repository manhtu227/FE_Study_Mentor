import { Button } from 'antd';

export default function Custom404() {
    return (
        <div className='h-full flex items-center justify-center flex-col gap-2'>
            <h2>404 - Không tìm thấy trang</h2>
            <Button href='/'>Trở về trang chủ</Button>
        </div>
    );
}
