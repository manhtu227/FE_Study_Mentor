import { USER_ID } from '@core/constants/commons.constant';
import { getUserDetailApi, userDetailKeys } from '@core/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { CertificatesInfoSection } from './CertificatesInfoSection';
import { EducationInfoSection } from './EducationInfoSection';
import { PersonalInfoSection } from './PersonalInfoSection';

export function ProfileForm() {
    const userQuery = useQuery({
        queryKey: userDetailKeys.list({ USER_ID }),
        queryFn: () => getUserDetailApi(USER_ID),
        select: (resp) => resp.data.data,
    });

    return (
        <div className='w-2/3 p-8 bg-white-900'>
            <Spin spinning={userQuery.isFetching} size='large'>
                <PersonalInfoSection data={userQuery.data} />
                <EducationInfoSection data={userQuery.data} />
                <CertificatesInfoSection data={userQuery.data} />
            </Spin>
        </div>
    );
}
