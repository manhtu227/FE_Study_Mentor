'use client';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import Characteristic from '@components/homepage/characteristic/Characteristic';
import MethodItem from '@components/study-method/StudyMethod';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { DescriptionEnum } from '@core/enums/common.enum';
import { UserRole } from '@core/models/user.model';
import { Button, Image } from 'antd';
import { useSession } from 'next-auth/react';

import 'react-multi-carousel/lib/styles.css';

const CHARACTEISTICS = [
    {
        id: 1,
        image: images.charac1,
        title: 'Đội ngũ người hướng dẫn chất lượng',
        description:
            'Tất cả các người hướng dẫn đều có kiến thức chuyên sâu, chứng chỉ đầy đủ và tâm huyết với nghề nghiệp giáo dục.',
    },
    {
        id: 2,
        image: images.charac2,
        title: 'Đa dạng hình thức giải đáp câu hỏi',
        description:
            'Hỗ trợ giải đáp câu hỏi bằng trí tuệ nhân tạo AI hoặc bởi người hướng dẫn chất lượng. Bạn có thể chọn lựa theo nhu cầu của mình.',
    },
    {
        id: 3,
        image: images.charac3,
        title: 'Hỗ trợ giải đáp câu hỏi 24/7.',
        description:
            'Bạn có thể đặt câu hỏi bất kỳ lúc nào, bất kỳ nơi đâu và nhận câu trả lời gần như ngay lập tức.',
    },
];

const ANONYMOUS_DESCRIPTION =
    'trang web hàng đầu hỗ trợ giải đáp cho mọi thắc mắc học tập của bạn. Dù bạn đang học tiểu học, trung học, đại học hay tự học, chúng tôi luôn sẵn sàng hỗ trợ thông qua trí tuệ nhân tạo AI và người hướng dẫn.';
const TUTOR_DESCRIPTION =
    'nền tảng nơi bạn có thể chia sẻ kiến thức và kiếm thêm thu nhập bằng cách trở thành người hướng dẫn. Hãy kết nối với hàng nghìn học viên đang tìm kiếm sự hỗ trợ và giải đáp thắc mắc học tập của họ, đồng thời phát triển sự nghiệp giáo dục của bạn.';

function Homepage() {
    const { data } = useSession();

    return (
        <div className='w-full h-full bg-[#F3F9FA]'>
            {/* section 1 */}
            <section
                className={`relative ${
                    data?.user?.user?.role === UserRole.STUDENT ? 'mb-[300px]' : ''
                }`}
            >
                <Image
                    src={images.hero1.src}
                    preview={false}
                    alt='Hero'
                    className='relative opacity-50 max-w-full'
                />
                <div className='absolute top-0 left-0 right-0 h-[650px] bg-[#0A2277] opacity-90'>
                    <div className='mb-[52px]'>
                        <h3 className='text-center font-bold text-[3.2rem] max-w-[650px] mx-auto text-white-900 mt-20'>
                            Kiến thức là sức mạnh, chia sẻ là niềm vui!
                        </h3>
                        <div className='mx-auto text-white-900 text-center font-medium text-3xl max-w-[640px]'>
                            Cùng nhau học hỏi - Cùng nhau tiến bộ
                        </div>
                    </div>
                    {data?.user?.user?.role !== UserRole.TUTOR ? (
                        <div className='flex items-center gap-[52px] w-full justify-center'>
                            <MethodItem
                                image={images.aiMethod}
                                title='Trả lời bằng AI'
                                titleButton='Trải nghiệm ngay'
                                type={DescriptionEnum.AI}
                                className='max-w-[600px]'
                                href={MY_ROUTE.AI.self}
                            />
                            <MethodItem
                                image={images.mentorMethod}
                                title='Giải đáp bởi người hướng dẫn'
                                titleButton='Trải nghiệm ngay'
                                type={DescriptionEnum.Mentor}
                                className='max-w-[600px]'
                                href={MY_ROUTE.MENTOR.self}
                            />
                        </div>
                    ) : (
                        <div className='mx-auto w-3/5 flex items-center justify-center flex-col gap-10 mt-20'>
                            <div className='text-gray-200 text-xl'>
                                Chào mừng bạn đến với{' '}
                                <span className='text-blue-600 shadow-lg font-bold uppercase'>
                                    Study Mentor
                                </span>
                                ,{' '}
                                {data?.user?.user?.role === UserRole.TUTOR
                                    ? TUTOR_DESCRIPTION
                                    : ANONYMOUS_DESCRIPTION}
                            </div>
                            <div className='flex items-start w-full'>
                                <Button
                                    size='large'
                                    className='!w-56 !h-14 text-2xl uppercase font-semibold flex items-center
                            justify-center no-underline'
                                    href={
                                        !data
                                            ? MY_ROUTE.AUTH.LOGIN
                                            : MY_ROUTE.MENTOR.RECEIVED_QUESTIONS
                                    }
                                >
                                    Bắt đầu ngay
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            {/* section 2 */}
            <section
                className={`flex items-center md:flex-wrap lg:flex-nowrap px-[180px] justify-around ${
                    data?.user?.user?.role !== UserRole.STUDENT ? 'mt-24' : ''
                }`}
            >
                {CHARACTEISTICS &&
                    CHARACTEISTICS.length > 0 &&
                    CHARACTEISTICS.map((item) => {
                        return (
                            <Characteristic
                                image={item.image}
                                title={item.title}
                                key={item.id}
                                description={item.description}
                            />
                        );
                    })}
            </section>
            {/* section 3 */}
            <section className='mx-[180px] mb-[200px]'>
                <div className='mb-8'>
                    <h4 className='font-bold text-[32px] text-center mb-6'>
                        <span className='text-blue-600'>Quy trình</span> đặt 1 câu hỏi với người
                        hướng dẫn của Study Mentor
                    </h4>
                    <div className='max-w-[845px] text-center mx-auto font-medium text-lg text-gray-700'>
                        Mỗi câu hỏi dù đơn giản hay phức tạp, người hướng dẫn của{' '}
                        <strong>Study Mentor</strong> đều đặt hết tâm huyết, đảm bảo cung cấp câu
                        trả lời chính xác cho người học.
                    </div>
                </div>
                <div className='flex items-center'>
                    <Image
                        preview={false}
                        src={images.process1.src}
                        alt='Quy trình đặt 1 câu hỏi với người hướng dẫn của Study Mentor'
                    />
                    <div className='relative'>
                        <Image
                            src={images.process2.src}
                            alt='Quy trình trả lời câu hỏi của Study Mentor'
                            className='relative -right-40'
                            preview={false}
                        />
                        <div className='absolute top-28 right-20 rotate-6'>
                            <div className='py-6 px-8 bg-white-900 mb-3 rounded-md'>
                                <span className='text-blue-600'>B1</span> &nbsp; Nhận thông tin câu
                                hỏi từ người học qua file hoặc cuộc họp trực tuyến
                            </div>
                            <div className='py-6 px-8 bg-white-900 mb-3 rounded-md'>
                                <span className='text-blue-600'>B2</span> &nbsp; Người hướng dẫn
                                phân tích câu hỏi để hiểu rõ vấn đề, cũng như xác định các yếu tố
                                quan trọng
                            </div>
                            <div className='py-6 px-8 bg-white-900 mb-3 rounded-md'>
                                <span className='text-blue-600'>B3</span> &nbsp; Người hướng dẫn
                                soạn thảo câu trả lời chi tiết, rõ ràng, dễ hiểu
                            </div>
                            <div className='py-6 px-8 bg-white-900 mb-3 rounded-md'>
                                <span className='text-blue-600'>B4</span> &nbsp; Gửi câu trả lời và
                                đảm bảo người học hiểu rõ vấn đề
                            </div>
                            <div className='py-6 px-8 bg-white-900 mb-3 rounded-md'>
                                <span className='text-blue-600'>B5</span> &nbsp; Sẵn sàng hỗ trợ
                                người học trong suốt quá trình giải đáp thắc mắc
                            </div>
                            <div className='py-6 px-8 bg-white-900 mb-3 rounded-md'>
                                <span className='text-blue-600'>B6</span> &nbsp; Học viên có thể
                                đánh giá câu trả lời và đánh giá người hướng dẫn
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* section 4 */}
            <section className='mx-[180px] bg-[#DAECEF] flex items-center max-h-[500px] mb-[100px]'>
                <div className='w-1/2 ml-[62px]'>
                    <div className='mb-6'>
                        <div className='font-bold text-[32px] mb-2'>Chúng tôi đã đạt được</div>
                        <div className='font-bold text-[38px] text-[#4EA8B4] mb-2'>
                            <span className='text-[#FFA51F]'>8000+</span> Học viên / Người hướng dẫn
                        </div>
                        <div className='font-bold text-[32px]'>đã tin tưởng sử dụng</div>
                    </div>
                    <div className='font-medium text-lg text-gray-700 mb-8'>
                        Ứng dụng giải đáp online cung cấp nền tảng giúp người dùng nhận được câu trả
                        lời nhanh chóng và chính xác từ các chuyên gia và cơ sở dữ liệu thông minh.
                    </div>
                    <ButtonPrimary
                        title={' XEM THÊM THÔNG TIN VỀ STUDY MENTOR'}
                        isRightIcon
                        className='h-[75px] w-full uppercase text-lg  bg-gradient-to-r from-[#3D64EE] to-[#5BB9E2]'
                    />
                </div>
                <div className='w-1/2 mt-[100px] mr-10'>
                    <Image
                        src={images.homeContact.src}
                        alt='XEM THÊM THÔNG TIN VỀ STUDY MENTOR'
                        preview={false}
                    />
                </div>
            </section>
        </div>
    );
}

export default Homepage;
