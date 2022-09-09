export const convertSeconds = (seconds) => {
  let time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (seconds >= 86400) {
    time.days = Math.floor(seconds / 86400);
    seconds %= 86400;
  }
  if (seconds >= 3600) {
    time.hours = Math.floor(seconds / 3600);
    seconds %= 3600;
  }
  if (seconds >= 60) {
    time.minutes = Math.floor(seconds / 60);
    seconds %= 60;
  }
  time.seconds = seconds;
  if (time.days > 0)
    return `${time.days} days and ${("0" + time.hours).slice(-2)}:${(
      "0" + time.minutes
    ).slice(-2)} hours`;
  if (time.hours > 0)
    return `${("0" + time.hours).slice(-2)}:${("0" + time.minutes).slice(
      -2
    )} hours`;
  if (time.minutes > 0)
    return `${("0" + time.minutes).slice(-2)}:${("0" + time.seconds).slice(
      -2
    )} minutes`;
  if (time.seconds > 0) return `${("0" + time.seconds).slice(-2)} seconds`;
  return "No Data";
};
