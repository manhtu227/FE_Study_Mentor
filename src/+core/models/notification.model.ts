import { NotificationType } from '@core/enums/notification.enum';

export type Notification = {
    id: string;
    message: string;
    type: NotificationType;
    createdAt: Date;
    questionId?: string;
};
