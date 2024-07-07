import { NotificationType } from '@core/enums/notification.enum';
import { GetQuestionResponseModel } from './question.model';
import { UserModel, UserRole } from './user.model';

export type Notification = {
    id?: string;
    type: NotificationType;
    tutor?: UserModel;
    student?: UserModel;
    question: GetQuestionResponseModel;
    role: UserRole;
    createdAt?: Date;
    message?: string;
};
