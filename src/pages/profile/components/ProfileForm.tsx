import { EducationInfoResp, UserResp } from '@core/models/profile.model';
import { EducationInfoSection } from './EducationInfoSection';
import { PersonalInfoSection } from './PersonalInfoSection';

export function ProfileForm({
    personalData,
    educationData,
}: {
    personalData?: UserResp;
    educationData?: EducationInfoResp;
}) {
    return (
        <div className='w-2/3 p-8 bg-white-900'>
            <PersonalInfoSection data={personalData} />
            <EducationInfoSection data={educationData} />
            {/* <CertificatesInfoSection data={data} /> */}
        </div>
    );
}
