import { UserType } from '@core/enums/user.enum';
import { EducationInfoResp, UserResp } from '@core/models/profile.model';
import { useSession } from 'next-auth/react';
import { EducationInfoSection } from './EducationInfoSection';
import { PersonalInfoSection } from './PersonalInfoSection';

export function ProfileForm({
    personalData,
    educationData,
    onUpdatePersonalInfo,
}: {
    personalData?: UserResp;
    educationData?: EducationInfoResp;
    onUpdatePersonalInfo: () => void;
}) {
    const { data: dataUser } = useSession();

    return (
        <div className='w-2/3 p-8 bg-white-900 pb-0 h-max'>
            <PersonalInfoSection data={personalData} onUpdatePersonalInfo={onUpdatePersonalInfo} />
            {dataUser?.user?.user?.role === UserType.TUTOR && (
                <EducationInfoSection data={educationData} />
            )}
        </div>
    );
}
