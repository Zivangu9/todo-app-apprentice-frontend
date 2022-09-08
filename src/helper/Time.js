export const convertSeconds = (seconds) => {
  let time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (seconds >= 86400) {
    time.days = Math.floor(seconds / 86400);
    seconds %= 86400;
  }
  console.log(seconds);
  if (seconds >= 3600) {
    time.hours = Math.floor(seconds / 3600);
    seconds %= 3600;
  }
  console.log(seconds);
  if (seconds >= 60) {
    time.minutes = Math.floor(seconds / 60);
    seconds %= 60;
  }
  console.log(seconds);
  time.seconds = seconds;
  if (time.days > 0)
    return `${time.days} days and ${time.hours}:${time.minutes} hours`;
  if (time.hours > 0) return `${time.hours}:${time.minutes} hours`;
  if (time.minutes > 0) return `${time.minutes}:${time.seconds} minutes`;
  if (time.seconds > 0) return `${time.seconds} seconds`;
  return "No Data";
};
