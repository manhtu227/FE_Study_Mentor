import RightOutlined from '@ant-design/icons/RightOutlined';
import images from '@assets/images';
import Characteristic from '@components/homepage/characteristic/Characteristic';
import MethodItem from '@components/study-method/StudyMethod';
import { Button } from 'antd';
import Image from 'next/image';

function Homepage() {
    const characteistics = [
        {
            id: 1,
            image: images.charac1,
            title: 'Mentor 1:1 dự án portfolio cá nhân',
            description:
                'Áp dụng phương pháp giảng dạy Porfolio Mentoring. Học & tương tác trực tiếp với giảng viên, được mentor dự án portfolio cá nhân xuyên suốt lộ trình học.',
        },
        {
            id: 2,
            image: images.charac2,
            title: 'Học tại HCM/ Hà Nội/ Trực tuyến Zoom',
            description:
                'Có thể học cùng lúc nhiều môn hoặc học tuần tự từng môn theo thời gian bạn có.',
        },
        {
            id: 3,
            image: images.charac3,
            title: 'Hỗ trợ thư viện video bài giảng đa dạng nhiều thể loại',
            description: 'Giúp bạn sở hữu trọn vẹn kiến thức dù có vắng học đột xuất.',
        },
    ];
    return (
        <div className='w-full h-full bg-[#F3F9FA]'>
            {/* section 1 */}
            <section className='relative mb-[300px]'>
                <Image src={images.hero1} alt='Hero' className='relative opacity-50' />
                <div className='absolute top-0 left-0 right-0 h-[650px] bg-[#0A2277] opacity-90'>
                    <div className='mb-[52px]'>
                        <h2 className='text-center font-bold text-[50px] max-w-[650px] mx-auto text-white'>
                            Upgrade Yourself, and Prepare a Better Future
                        </h2>
                        <div className='mx-auto text-white text-center font-medium text-2xl max-w-[640px]'>
                            Something bigger to achive your dreams so we provide all of these great
                            things for you.
                        </div>
                    </div>
                    <div className='flex items-center gap-[52px] w-full justify-center'>
                        <MethodItem
                            image={images.aiMethod}
                            title='Trả lời bằng AI'
                            titleButton='Trải nghiệm ngay'
                            type={1}
                        />
                        <MethodItem
                            image={images.mentorMethod}
                            title='Tìm kiếm người hướng dẫn'
                            titleButton='Tìm người hướng dẫn'
                            type={1}
                        />
                    </div>
                </div>
            </section>
            {/* section 2 */}
            <section className='flex items-center gap-[10px] px-[180px]'>
                {characteistics &&
                    characteistics.length > 0 &&
                    characteistics.map((item) => {
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
                        <span className='text-blue-600'>Quy trình</span> làm việc của Study Mentor
                    </h4>
                    <div className='max-w-[845px] text-center mx-auto font-medium text-lg text-[#838B8F]'>
                        Mỗi dự án dù lớn hay nhỏ, Study Mentor đều lên kế hoạch chi tiết, đảm bảo
                        website của bạn độc đáo, duy nhất, có giá trị thực
                    </div>
                </div>
                <div className='flex items-center'>
                    <Image src={images.process1} alt='Quy trình làm việc của Study Mentor' />
                    <div className='relative'>
                        <Image
                            src={images.process2}
                            alt='Quy trình làm việc của Study Mentor'
                            className='relative -right-40'
                        />
                        <div className='absolute top-28 right-20 rotate-6'>
                            <div className='py-6 px-8 bg-white mb-3 rounded-md'>
                                <span className='text-blue-600'>B1</span> &nbsp; Nhận thông tin và
                                tư vấn giải pháp web phù hợp
                            </div>
                            <div className='py-6 px-8 bg-white mb-3 rounded-md'>
                                <span className='text-blue-600'>B1</span> &nbsp; Nhận thông tin và
                                tư vấn giải pháp web phù hợp
                            </div>
                            <div className='py-6 px-8 bg-white mb-3 rounded-md'>
                                <span className='text-blue-600'>B1</span> &nbsp; Nhận thông tin và
                                tư vấn giải pháp web phù hợp
                            </div>
                            <div className='py-6 px-8 bg-white mb-3 rounded-md'>
                                <span className='text-blue-600'>B1</span> &nbsp; Nhận thông tin và
                                tư vấn giải pháp web phù hợp
                            </div>
                            <div className='py-6 px-8 bg-white mb-3 rounded-md'>
                                <span className='text-blue-600'>B1</span> &nbsp; Nhận thông tin và
                                tư vấn giải pháp web phù hợp
                            </div>
                            <div className='py-6 px-8 bg-white mb-3 rounded-md'>
                                <span className='text-blue-600'>B1</span> &nbsp; Nhận thông tin và
                                tư vấn giải pháp web phù hợp
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* section 4 */}
            <section className='mx-[180px] bg-[#DAECEF] flex items-center max-h-[500px] mb-[100px]'>
                <div className='w-1/2 ml-[62px]'>
                    <div className='mb-6'>
                        <div className='font-bold text-[32px] mb-2'>Lorem ipsum dolor sit amet</div>
                        <div className='font-bold text-[38px] text-[#4EA8B4] mb-2'>
                            <span className='text-[#FFA51F]'>8000+</span> Student / Mentor
                        </div>
                        <div className='font-bold text-[32px]'>consectetur adipiscing elit</div>
                    </div>
                    <div className='font-medium text-lg text-[#838B8F] mb-8'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                    <Button className='h-[75px] w-full uppercase text-lg text-white bg-gradient-to-r from-[#3D64EE] to-[#5BB9E2] hover:!text-white hover:opacity-80'>
                        XEM THÊM THÔNG TIN VỀ STUDY MENTOR <RightOutlined className='text-white' />
                    </Button>
                </div>
                <div className='w-1/2 mt-[100px] mr-10'>
                    <Image src={images.homeContact} alt='XEM THÊM THÔNG TIN VỀ STUDY MENTOR' />
                </div>
            </section>
            {/* section 5 */}
            <section className='mb-[70px] px-40'>
                <div className='font-bold text-[32px] text-[#3D64EE] text-center leading-[50px]'>
                    Người dùng
                    <div className='font-bold text-[32px] text-center text-black'>
                        Study Mentor đã tin tưởng sử dụng
                    </div>
                </div>
                {/* <Feedbacks /> */}
            </section>
        </div>
    );
}

export default Homepage;
