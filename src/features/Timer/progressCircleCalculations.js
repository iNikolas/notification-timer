export default function getProgressValue(timeLeft, timeLimit, fullDashArray) {
  const rawTimeFraction = timeLeft / timeLimit;
  const lengthReduction =
    rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);

  const circleDasharray = (lengthReduction * fullDashArray).toFixed(0);
  return circleDasharray;
}
