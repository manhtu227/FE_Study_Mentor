import { UserResp } from '@core/models/profile.model';
import { CertificatesInfoSection } from './CertificatesInfoSection';
import { EducationInfoSection } from './EducationInfoSection';
import { PersonalInfoSection } from './PersonalInfoSection';

export function ProfileForm({ data }: { data?: UserResp }) {
    return (
        <div className='w-2/3 p-8 bg-white-900'>
            <PersonalInfoSection data={data} />
            <EducationInfoSection data={data} />
            <CertificatesInfoSection data={data} />
        </div>
    );
}
