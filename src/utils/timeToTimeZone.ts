import { fromZonedTime } from 'date-fns-tz';

export function timeToTimeZone({ originalTime }: { originalTime: string }) {
  const timeZone = 'Europe/Paris';
  const zonedDate = fromZonedTime(+originalTime, timeZone, {
    timeZone,
  });
  return zonedDate.getTime() / 1000;
}
