import { DATE_FORMAT } from '@core/constants/date.constant';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export const parseDateTimeISO8601 = (date: Dayjs) =>
    date.format(DATE_FORMAT.DATE_TIME_SECOND.ISO8601);
