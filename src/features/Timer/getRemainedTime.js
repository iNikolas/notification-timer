export default function getRemainedTime(startingTime, time) {
  const timerStarted = new Date(startingTime);
  const currentTime = new Date();
  const timeElapsed = Math.floor((currentTime - timerStarted) / 1000);
  const timeRemained = time - timeElapsed;

  return timeRemained > 0 ? timeRemained : 0;
}
