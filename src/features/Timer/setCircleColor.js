export default function setRemainingPathColor(timeLeft, colorCodes) {
  const { alert, warning, info } = colorCodes;

  if (timeLeft <= alert.threshold) {
    return alert.color;
  }
  if (timeLeft <= warning.threshold) {
    return warning.color;
  }

  return info.color;
}
