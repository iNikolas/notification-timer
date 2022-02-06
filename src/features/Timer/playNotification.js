import notification from "./happyBellsNotification.wav";

export default function playNotification() {
  const audio = new Audio(notification);
  audio.play();
}
