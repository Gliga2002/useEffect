import { useState, useEffect } from "react";

function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <progress max={timer} value={remainingTime} />;
}

export default ProgressBar;
