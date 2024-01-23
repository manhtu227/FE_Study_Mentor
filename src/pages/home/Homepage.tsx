import React from 'react';
import MethodItem from '@components/study-method/StudyMethod';
import images from '@assets/images';
function Homepage() {
    return (
        <div className='w-full h-full bg-slate-400 pt-10'>
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
    );
}

export default Homepage;
