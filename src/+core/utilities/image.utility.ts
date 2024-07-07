import images from '@assets/images';
import { ENV } from '@core/constants/env.constants';
import { UserRole } from '@core/models/user.model';

const getImageDependOnRole = (role?: UserRole) => {
    switch (role) {
        case UserRole.STUDENT:
            return images.student.src;
        case UserRole.TUTOR:
            return images.teacher.src;
        default:
            return images.student.src;
    }
};

export const imageUtility = (key?: string, type?: UserRole): string => {
    return !key ? getImageDependOnRole(type) : `${ENV.PHOTO}${key}`;
};
