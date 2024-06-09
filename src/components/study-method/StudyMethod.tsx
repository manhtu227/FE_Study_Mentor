import RightOutlined from '@ant-design/icons/RightOutlined';
import { DescriptionEnum } from '@core/enums/common.enum';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

const listDescriptions = [
    {
        type: DescriptionEnum.AI,
        title: 'AI',
        description: [
            '1. Tốc độ: Giải đáp nhanh chóng, 24/7.',
            '2. Khả năng: Xử lý dữ liệu lớn, đưa ra câu trả lời chính xác.',
            '3. Tính khách quan: Loại bỏ cảm xúc, định kiến, mang tính trung lập.',
            '4. Chi phí: Hiệu quả, tiết kiệm chi phí.',
        ],
    },
    {
        type: DescriptionEnum.Mentor,
        title: 'Mentor',
        description: [
            '1. Sự thấu hiểu: người hướng dẫn có khả năng hiểu được các sắc thái của ngôn ngữ và ý định của người dùng, do đó có thể cung cấp câu trả lời phù hợp và hiệu quả hơn.',
            '2. Sáng tạo: sử dụng tư duy sáng tạo để giải quyết các vấn đề phức tạp và đưa ra những giải pháp mới mẻ.',
            '3. Kỹ năng giao tiếp: có thể giao tiếp hiệu quả với người dùng, giúp họ dễ dàng hiểu được câu trả lời và giải quyết vấn đề.',
            '4. Khả năng xây dựng mối quan hệ: Tạo dựng lòng tin, thu hút người dùng quay lại.',
        ],
    },
    {
        type: DescriptionEnum.GoogleMeet,
        title: 'Google-meet',
        description: [
            '1. Cho phép bạn tham gia giải đáp thắc mắc dù bất kể vị trí địa lý nào.',
            '2. Có thể tham gia cuộc họp từ bất kỳ thiết bị nào có kết nối internet, bao gồm máy tính, máy tính bảng và điện thoại thông minh.',
            '3. Cung cấp các tính năng tương tác như chia sẻ màn hình, trò chuyện và thăm dò để giúp bạn thu hút người tham gia và đảm bảo họ hiểu bài học.',
            '4. Có thể ghi lại các phiên họp để người tham gia có thể xem lại sau hoặc những người không thể tham dự có thể xem lại.',
        ],
    },
    {
        type: DescriptionEnum.File,
        title: 'File',
        description: [
            '1. Có thể học tập theo tốc độ của riêng mình và xem lại tệp nhiều lần nếu cần.',
            '2. Có thể dễ dàng tham khảo tệp để ôn tập lại tài liệu hoặc tra cứu thông tin cụ thể.',
            '3. Tiết kiệm thời gian, có thể đặt nhiều câu hỏi mà không cần phải trực tiếp gặp mặt người hướng dẫn.',
        ],
    },
    {
        type: DescriptionEnum.FreeAI,
        title: 'Free-AI',
        description: [
            '1. Cho phép mọi người truy cập mà không cần trả phí.',
            '2. Tốc độ phản hồi nhanh chóng.',
            '3. Trả lời được hầu hết các câu hỏi liên quan đến học tập.',
        ],
    },
    {
        type: DescriptionEnum.PaidAI,
        title: 'Paid-AI',
        description: [
            '1. Ngoài dữ liệu của AI miễn phí, AI có phí còn sử dụng dữ liệu riêng biệt của website giúp trả lời được nhiều câu hỏi mà AI miễn phí không trả lời được.',
            '2. Có thể đặt câu hỏi với hình ảnh, hoặc file.',
            '3. Sử dụng nguồn thông tin mới nhất, được cập nhật hằng tuần.',
        ],
    },
];

function MethodItem({
    image,
    titleButton,
    type,
    title,
    href,
    className,
    onClick,
}: {
    image: StaticImageData;
    titleButton: string;
    title: string;
    type: number;
    href?: string;
    className?: string;
    onClick?: () => void;
}) {
    const description =
        listDescriptions && listDescriptions.find((item) => item.type === type)?.description;
    return (
        <div
            className={`items-center shadow-sm bg-white-900 flex flex-col pb-8 rounded-lg ${className}`}
        >
            <Image
                loading='lazy'
                src={image}
                alt={title}
                className='aspect-[2.73] object-center w-full self-stretch overflow-hidden max-md:max-w-full rounded-t-lg object-cover'
            />

            <div className='items-stretch flex flex-col justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap mx-8'>
                <div className='text-neutral-700 text-lg font-bold leading-7 tracking-normal max-md:max-w-full'>
                    {title}
                </div>
                <div
                    className='items-stretch flex-grow flex-col max-md:max-w-full overflow-y-scroll leading-6 h-[152px]'
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'blue',
                    }}
                >
                    {description &&
                        description.map((item, index) => {
                            return (
                                <div
                                    className='text-neutral-700 text-base leading-6 tracking-normal max-md:max-w-full mb-4'
                                    key={index}
                                >
                                    {item}
                                </div>
                            );
                        })}
                </div>
            </div>
            <div>
                {onClick ? (
                    <div
                        onClick={onClick}
                        className='no-underline justify-center items-stretch bg-blue-600 inline-flex gap-4 mt-6 px-14 py-4 rounded-lg max-md:px-5 cursor-pointer outline-none border-none hover:opacity-85'
                    >
                        <div className='text-slate-100 text-base font-bold leading-6 tracking-normal'>
                            {titleButton}
                        </div>
                        <RightOutlined className='text-white-900' />
                    </div>
                ) : (
                    <Link
                        href={href || ''}
                        className='no-underline justify-center items-stretch bg-blue-600 inline-flex gap-4 mt-6 px-14 py-4 rounded-lg max-md:px-5 cursor-pointer outline-none border-none hover:opacity-85'
                    >
                        <div className='text-slate-100 text-base font-bold leading-6 tracking-normal'>
                            {titleButton}
                        </div>
                        <RightOutlined className='text-white-900' />
                    </Link>
                )}
            </div>
        </div>
    );
}
export default MethodItem;
