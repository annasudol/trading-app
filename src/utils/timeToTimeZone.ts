import { fromZonedTime } from 'date-fns-tz';

export function timeToTimeZone({
  originalTime,
  timeZone,
}: {
  originalTime: string;
  timeZone: 'Europe/Paris' | 'UTC';
}) {
  const zonedDate = fromZonedTime(+originalTime, timeZone, {
    timeZone,
  });
  return zonedDate.getTime() / 1000;
}
