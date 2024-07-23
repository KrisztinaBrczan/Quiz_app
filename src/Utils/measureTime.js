export default function measureTime(setSeconds, setMinutes) {
  let interval = setInterval(() => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 59) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        return 0;
      } else {
        return prevSeconds + 1;
      }
    });
  }, 1000);
  return interval;
}
