import images from '@assets/images';
import { ENV } from '@core/constants/env.constants';

export const imageUtility = (key?: string): string => {
    return !key ? images.teacher.src : `${ENV.PHOTO}${key}`;
};
