import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInMonths,
    differenceInSeconds,
    differenceInYears,
} from 'date-fns';

export function calculateTimeAgo(date: Date): string {
    const now = new Date();
    const newDate = new Date(date);

    const seconds = differenceInSeconds(now, newDate);
    if (seconds < 60) {
        return `khoảng ${seconds} giây trước`;
    }

    const minutes = differenceInMinutes(now, newDate);
    if (minutes < 60) {
        return `khoảng ${minutes} phút trước`;
    }

    const hours = differenceInHours(now, newDate);
    if (hours < 24) {
        return `khoảng ${hours} giờ trước`;
    }

    const days = differenceInDays(now, newDate);
    if (days < 30) {
        return `khoảng ${days} ngày trước`;
    }

    const months = differenceInMonths(now, newDate);
    if (months < 12) {
        return `khoảng ${months} tháng trước`;
    }

    const years = differenceInYears(now, newDate);
    return `khoảng ${years} năm trước`;
}
