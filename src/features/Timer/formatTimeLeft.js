export default function formatTimeLeft(time) {
  const hours = Math.floor(time / (60 * 60));
  let minutes = Math.floor(time / 60) - hours * 60;
  let seconds = time % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
}
