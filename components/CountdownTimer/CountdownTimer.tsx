// Import necessary React hooks and types
import { useState, useRef, useEffect, ChangeEvent } from "react";
import styles from "./CountdownTimer.module.scss";

export default function Countdown() {
  // State to manage the minutes and seconds inputs
  const [minutes, setMinutes] = useState<number | string>("00");
  const [seconds, setSeconds] = useState<number | string>("00");
  const [maxMinutes] = useState<number>(20);
  const [maxSeconds] = useState<number>(59);

  // State to manage the countdown timer value
  const [timeLeft, setTimeLeft] = useState<number>(0);
  // State to track if the timer is active
  const [isActive, setIsActive] = useState<boolean>(false);
  // State to track if the timer is paused
  const [isPaused, setIsPaused] = useState<boolean>(false);
  // Reference to store the timer ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle starting the countdown timer
  const handleStart = (): void => {
    const totalMinutes = Number(minutes) || 0;
    const totalSeconds = Number(seconds) || 0;
    const totalDuration = totalMinutes * 60 + totalSeconds;

    if (totalDuration > 0) {
      setTimeLeft(totalDuration);
      setIsActive(true);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to pause the countdown timer
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleResume = (): void => {
    if (isPaused) {
      setIsPaused(false);
      setIsActive(true);
    }
  };

  // Function to reset the countdown timer
  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);

    const totalMinutes = Number(minutes) || 0;
    const totalSeconds = Number(seconds) || 0;
    const totalDuration = totalMinutes * 60 + totalSeconds;

    setTimeLeft(totalDuration);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // useEffect hook to manage the countdown interval
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setIsActive(false);
            setIsPaused(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  useEffect(() => {
    // Keep timeLeft in sync with minutes/seconds when not active
    if (!isActive && !isPaused) {
      setTimeLeft(Number(minutes) * 60 + Number(seconds));
    }
  }, [minutes, seconds, isActive, isPaused]);

  // Function to format the time left into mm:ss format
  const formatTime = (time: number, res: "minutes" | "seconds"): string => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    if (res === "minutes") return String(min).padStart(2, "0");
    if (res === "seconds") return String(sec).padStart(2, "0");
    return "00";
  };

  // Function to handle changes in the minutes input field
  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = Math.max(0, Number(e.target.value) || 0);
    if (value > maxMinutes) value = maxMinutes;
    setMinutes(value);
  };

  // Function to handle changes in the seconds input field
  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = Math.max(0, Number(e.target.value) || 0);
    if (value > maxSeconds) value = maxSeconds;
    setSeconds(value);
  };

  // Increment and Decrement Functions for Minutes
  const incrementMinutes = (): void => {
    setMinutes((prevMinutes) => {
      let newMinutes = Number(prevMinutes) + 1;
      if (newMinutes > maxMinutes) newMinutes = 0;
      return `${String(newMinutes).padStart(2, "0")}`;
    });
  };

  const decrementMinutes = (): void => {
    setMinutes((prevMinutes) => {
      let newMinutes = Number(prevMinutes) - 1;
      if (newMinutes < 0) newMinutes = maxMinutes;
      return `${String(newMinutes).padStart(2, "0")}`;
    });
  };

  // Increment and Decrement Functions for Seconds
  const incrementSeconds = (): void => {
    setSeconds((prevSeconds) => {
      let newSeconds = Number(prevSeconds) + 1;
      if (newSeconds > maxSeconds) newSeconds = 0;
      return `${String(newSeconds).padStart(2, "0")}`;
    });
  };

  const decrementSeconds = (): void => {
    setSeconds((prevSeconds) => {
      let newSeconds = Number(prevSeconds) - 1;
      if (newSeconds < 0) newSeconds = maxSeconds;
      return `${String(newSeconds).padStart(2, "0")}`;
    });
  };

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.countdownBox}>
        <div className={styles.inputGroup}>
          <div className={styles.timeWrapper}>
            <button
              onClick={incrementMinutes}
              className={`${styles.stepButton} ${styles.plus}`}
            >
              +
            </button>
            <div className={styles.timerBox}>
              <input
                type="number"
                value={formatTime(timeLeft, "minutes")}
                onChange={handleMinutesChange}
                className={`${styles.durationInput} ${styles.firstDuration}`}
                disabled={isActive}
              />
              {/* <span className={styles.timerDisplay}>{minutes}</span>
              <div className={styles.timerDisplay}>{formatTime(timeLeft,'minutes')}</div> */}
            </div>
            <button
              onClick={decrementMinutes}
              className={`${styles.stepButton} ${styles.minus}`}
            >
              -
            </button>
          </div>
          <div className={styles.timerBox}>
            <span className={styles.separate}>:</span>
          </div>
          <div className={styles.timeWrapper}>
            <button
              onClick={incrementSeconds}
              className={`${styles.stepButton} ${styles.plus}`}
            >
              +
            </button>
            <div className={styles.timerBox}>
              <input
                type="number"
                value={formatTime(timeLeft, "seconds")}
                onChange={handleSecondsChange}
                className={`${styles.durationInput} ${styles.secondDuration}`}
                disabled={isActive}
              />
              {/* <span className={styles.timerDisplay}>{seconds}</span>
              <div className={styles.timerDisplay}>{formatTime(timeLeft,'seconds')}</div> */}
            </div>

            <button
              onClick={decrementSeconds}
              className={`${styles.stepButton} ${styles.minus}`}
            >
              -
            </button>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button
            disabled={isActive && !isPaused}
            onClick={isPaused ? handleResume : handleStart}
            className={styles.controlButton}
          >
            {isPaused ? "Resume" : "Start"}
          </button>
          <button
            disabled={!isActive || isPaused}
            onClick={handlePause}
            className={styles.controlButton}
          >
            Pause
          </button>
          <button onClick={handleReset} className={styles.controlButton}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
