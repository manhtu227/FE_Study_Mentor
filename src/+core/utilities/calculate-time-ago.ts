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

    const seconds = differenceInSeconds(now, date);
    if (seconds < 60) {
        return `khoảng ${seconds} giây trước`;
    }

    const minutes = differenceInMinutes(now, date);
    if (minutes < 60) {
        return `khoảng ${minutes} phút trước`;
    }

    const hours = differenceInHours(now, date);
    if (hours < 24) {
        return `khoảng ${hours} giờ trước`;
    }

    const days = differenceInDays(now, date);
    if (days < 30) {
        return `khoảng ${days} ngày trước`;
    }

    const months = differenceInMonths(now, date);
    if (months < 12) {
        return `khoảng ${months} tháng trước`;
    }

    const years = differenceInYears(now, date);
    return `khoảng ${years} năm trước`;
}
