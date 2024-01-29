import images from '@assets/images';
import MethodItem from '@components/study-method/StudyMethod';

function MentorMethodPage() {
    return (
        <div className='flex items-center gap-[52px] w-full justify-center mb-[58px]'>
            <MethodItem
                image={images.ggMeetMethod}
                title='Trả lời thông qua Zoom/ Google meet'
                titleButton='Trải nghiệm ngay'
                type={1}
            />
            <MethodItem
                image={images.fileMethod}
                title='Trả lời thông qua File hướng dẫn (PDF, DOC, ...)'
                titleButton='Tìm người hướng dẫn'
                type={1}
            />
        </div>
    );
}

export default MentorMethodPage;
