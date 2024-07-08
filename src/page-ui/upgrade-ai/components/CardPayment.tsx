import { CheckOutlined } from '@ant-design/icons';
import ButtonOutlined from '@components/button/ButtonOutlined';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { ExpirationDateType } from '@core/services/payment.service';
import { formatPriceVND } from '@core/utilities/caculate-price.utility';
import { Radio, RadioChangeEvent } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';

const AiFree = [
    'Không giới hạn số lượng câu hỏi',
    'Hỗ trợ viết, giải quyết vấn đề và nhiều tính năng khác',
    'Truy cập vào GPT-3.5 và Gemini',
    'Quyền truy cập hạn chế vào các tính năng phân tích dữ liệu nâng cao, tải lên tệp, thị giác, tìm kiếm trên web',
];

const AiUpgrade = [
    'Quyền truy cập sớm vào các tính năng mới',
    'Truy cập vào các tính năng phân tích dữ liệu nâng cao, tải lên tệp, thị giác và tìm kiếm trên web',
    'Sử dụng nguồn thông tin mới nhất, được cập nhật hằng tuần.',
    'Có thể đặt câu hỏi với hình ảnh, hoặc file',
];

type Props = {
    checkUpgrade?: boolean;
    onClick?: (type: ExpirationDateType) => void;
};

const CardPayment = ({ checkUpgrade, onClick }: Props) => {
    const [value, setValue] = useState(ExpirationDateType.DAY);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    return (
        <div className='flex flex-col p-6 gap-1 border-solid border-gray-500 border-[1px] max-w-96 rounded-md'>
            <span>{checkUpgrade ? 'Trả phí' : 'Miễn phí'}</span>
            {checkUpgrade && (
                <>
                    <span className='text-gray-900'>
                        VNĐ{' '}
                        {formatPriceVND(
                            ExpirationDateType.DAY === value
                                ? 15000
                                : ExpirationDateType.WEEK === value
                                ? 105000
                                : ExpirationDateType.MONTH === value
                                ? 225000
                                : 2500000,
                        )}
                        /
                        {ExpirationDateType.DAY === value
                            ? 'ngày'
                            : ExpirationDateType.WEEK === value
                            ? 'tuần'
                            : ExpirationDateType.MONTH === value
                            ? 'tháng'
                            : 'năm'}
                    </span>
                    <Radio.Group onChange={onChange} value={value} className='flex flex-col'>
                        <Radio value={ExpirationDateType.DAY}>1 ngày</Radio>
                        <Radio value={ExpirationDateType.WEEK}>1 tuần</Radio>
                        <Radio value={ExpirationDateType.MONTH}>1 tháng (Giảm 50%)</Radio>
                        <Radio value={ExpirationDateType.YEAR}>1 năm (Giảm 50%)</Radio>
                    </Radio.Group>
                </>
            )}
            {checkUpgrade ? (
                <ButtonPrimary
                    title={'Nâng cấp ngay'}
                    onClick={() => {
                        onClick && onClick(value);
                    }}
                    className='my-2 !h-[45px] !rounded-full'
                />
            ) : (
                <ButtonOutlined
                    title={'Kế hoạch hiện tại của bạn'}
                    className={clsx('my-2 !h-[45px] !rounded-full')}
                />
            )}

            <div className='flex flex-col gap-2'>
                {(checkUpgrade ? AiUpgrade : AiFree).map((item, index) => (
                    <div key={index} className='flex gap-2'>
                        <CheckOutlined className='stroke-primary-800' />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardPayment;
