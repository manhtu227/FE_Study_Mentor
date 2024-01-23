import React from 'react';

function Footer() {
    return (
        <footer className='justify-center items-center bg-blue-900 flex flex-col px-[180px] pt-[52px] max-md:px-5'>
            <div className='flex w-full items-start justify-between max-md:max-w-full max-md:flex-wrap pb-[52px]'>
                <nav className='items-stretch flex basis-[0%] flex-col self-start'>
                    <a
                        href='/'
                        className='text-slate-100 text-lg font-bold leading-7 tracking-normal whitespace-nowrap no-underline'
                    >
                        Về Study mentor
                    </a>
                    <a
                        href='/'
                        className='text-slate-100 text-base leading-6 tracking-normal mt-4  no-underline hover:opacity-80'
                    >
                        Giới thiệu
                    </a>
                    <a
                        href='/'
                        className='text-slate-100 text-base leading-6 tracking-normal mt-4  no-underline hover:opacity-80'
                    >
                        Liên hệ
                    </a>
                    <a
                        href='/'
                        className='text-slate-100 text-base leading-6 tracking-normal mt-4  no-underline hover:opacity-80'
                    >
                        Hỏi đáp
                    </a>
                    <a
                        href='/'
                        className='text-slate-100 text-base leading-6 tracking-normal whitespace-nowrap mt-4 no-underline hover:opacity-80 '
                    >
                        Chính sách bảo mật
                    </a>
                </nav>
                <nav className='items-stretch flex basis-[0%] flex-col self-start'>
                    <a
                        href='/'
                        className='text-slate-100 text-lg font-bold leading-7 tracking-normal no-underline'
                    >
                        Cộng đồng
                    </a>
                    <a
                        href='/'
                        className='text-slate-100 text-base leading-6 tracking-normal whitespace-nowrap mt-4 no-underline hover:opacity-80 '
                    >
                        Chăm sóc khách hàng
                    </a>
                    <a
                        href='/'
                        className='text-slate-100 text-base leading-6 tracking-normal whitespace-nowrap mt-4 no-underline hover:opacity-80 '
                    >
                        Cộng đồng chia sẻ
                    </a>
                    <a
                        href='/'
                        className='text-slate-100 text-base leading-6 tracking-normal mt-4  no-underline hover:opacity-80'
                    >
                        Danh mục
                    </a>
                </nav>
                <div className='items-stretch flex-grow basis-[0%] flex-col self-start max-w-[527px]'>
                    <h2 className='text-slate-100 text-lg font-bold leading-7 tracking-normal max-md:max-w-full'>
                        Địa chỉ
                    </h2>
                    <p className='text-slate-100 text-base leading-6 tracking-normal mt-4  no-underline max-md:max-w-full hover:opacity-80'>
                        Công ty TNHH Công Nghệ Test Example Việt Nam
                    </p>
                    <p className='text-slate-100 text-base leading-6 tracking-normal mt-3 max-md:max-w-full hover:opacity-80'>
                        MST: 0123456789
                    </p>
                    <p className='text-slate-100 text-base leading-6 tracking-normal mt-3 max-md:max-w-full hover:opacity-80'>
                        Địa chỉ: Tầng X, Tòa nhà Test Example, Sô 1 Example, Phường Tăng Nhơn Phú,
                        Quận 9, Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                    <p className='text-slate-100 text-base leading-6 tracking-normal mt-3 max-md:max-w-full hover:opacity-80'>
                        Email: trogiup@studymentor.vn
                    </p>
                </div>
                <nav className='items-start self-stretch flex-basis-[0%] flex-col'>
                    <h2 className='text-slate-100 text-lg font-bold leading-7 tracking-normal self-stretch whitespace-nowrap'>
                        Ứng dụng tải xuống
                    </h2>
                    <img
                        loading='lazy'
                        src='https://cdn.builder.io/api/v1/image/assets/TEMP/a5b9eb89f842cdf67865f70823677c3e431c1805530b8f92e17c1e33a06a075f?apiKey=0a07649ecf3343109f8aaba52b146cec&'
                        className='aspect-[1.52] object-contain object-center w-[152px] items-start overflow-hidden max-w-full mt-4  self-start'
                        alt=''
                    />
                    <h2 className='text-slate-100 text-lg font-bold leading-7 tracking-normal self-stretch mt-6'>
                        Mạng xã hội
                    </h2>
                    <img
                        loading='lazy'
                        src='https://cdn.builder.io/api/v1/image/assets/TEMP/ee4997ea129f0b267c67d78b2f5de27321450878c893e5687d8ca58b4a59d41e?apiKey=0a07649ecf3343109f8aaba52b146cec&'
                        className='ml-[-20px] aspect-[5.44] object-contain object-center w-[174px] items-start overflow-hidden self-center mt-4 '
                        alt=''
                    />
                </nav>
            </div>
            <div
                className='text-slate-100 text-sm leading-5 tracking-normal whitespace-nowrap text-center self-stretch bg-blue-900 pt-6 pb-[52px] px-16 max-md:px-5 border-t-[1px] border-r-0 border-l-0 border-b-0 border-solid'
                aria-label='Footer'
            >
                © 2022 Công ty TNHH Công Nghệ Test Example Việt Nam
            </div>
        </footer>
    );
}

export default Footer;
