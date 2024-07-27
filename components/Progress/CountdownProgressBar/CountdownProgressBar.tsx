import { useState, useEffect, useRef } from "react";

interface CountdownProgressBarProps {
  duration: number; // duration in seconds
  onComplete: () => void; // callback function when countdown completes
  resetTrigger?: boolean; // trigger to reset the countdown
  delay?: number; // delay in milliseconds before starting the countdown
  displayMode?: "seconds" | "percentage" | "none"; // display mode for countdown
  showCompletedText?: boolean; // show or hide the completed text
  completedText?: string; // text to show when countdown completes
}

const CountdownProgressBar: React.FC<CountdownProgressBarProps> = ({
  duration,
  onComplete,
  resetTrigger = false,
  delay = 500,
  displayMode = "percentage",
  showCompletedText = false,
  completedText = "Completed",
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isStarted, setIsStarted] = useState(false); // track if countdown has started
  const [isCompleted, setIsCompleted] = useState(false); // track if countdown has completed
  const isComplete = useRef(false); // useRef to track completion
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing intervals and timeouts
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }

    if (resetTrigger) {
      setIsStarted(true);
    }

    if (isStarted) {
      isComplete.current = false;
      setIsCompleted(false);
      setTimeLeft(duration); // Reset time left to duration

      const startCountdown = () => {
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        timerRef.current = setInterval(() => {
          const now = Date.now();
          const newTimeLeft = Math.max(0, (endTime - now) / 1000);

          if (newTimeLeft <= 0) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            if (!isComplete.current) {
              isComplete.current = true;
              countdownComplete();
            }
          }

          setTimeLeft(newTimeLeft);
        }, 100);
      };

      delayTimeoutRef.current = setTimeout(() => {
        startCountdown();
      }, delay);
    }

    const countdownComplete = () => {
      setIsCompleted(true);
      onComplete();
    };

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, [duration, onComplete, resetTrigger, delay, isStarted]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div
      style={{
        background: "#f1f1f1",
        width: "100%",
        height: "30px",
        borderRadius: "50px",
        overflow: "hidden", // Ensure the gradient stays within the rounded corners
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          background: "linear-gradient(to right, #cd9d0b, #ffdc31)",
          borderRadius: "50px",
          transition: "width 0.1s linear",
        }}
      ></div>
      {showCompletedText && isCompleted && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "#000000" }}>{completedText}</p>
        </div>
      )}
      {!isComplete.current && displayMode !== "none" && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {displayMode === "percentage" ? `${Math.round(percentage)}%` : `${Math.ceil(timeLeft)} s`}
        </div>
      )}
    </div>
  );
};

export default CountdownProgressBar;