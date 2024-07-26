import { useState, useEffect, useRef } from "react";

interface CountdownProgressBarProps {
  duration: number; // duration in seconds
  onComplete: () => void; // callback function when countdown completes
  resetTrigger?: boolean; // trigger to reset the countdown
  delay?: number; // delay in milliseconds before starting the countdown
  showPercentage?: boolean; // show or hide the percentage text
}

const CountdownProgressBar: React.FC<CountdownProgressBarProps> = ({
  duration,
  onComplete,
  resetTrigger = false,
  delay = 500,
  showPercentage = false,
}) => {
  const [percentage, setPercentage] = useState(100);
  const [isStarted, setIsStarted] = useState(false); // track if countdown has started
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

    if (!isStarted && resetTrigger) {
      setIsStarted(true);
    }

    if (isStarted) {
      isComplete.current = false;
      setPercentage(100); // Reset percentage to 100%

      const totalMilliseconds = duration * 1000;
      const interval = totalMilliseconds / 100;

      const startCountdown = () => {
        timerRef.current = setInterval(() => {
          setPercentage((prev) => {
            if (prev <= 1) {
              if (timerRef.current) {
                clearInterval(timerRef.current);
              }
              if (!isComplete.current) {
                // Check if already completed
                isComplete.current = true;
                onComplete();
              }
              return 0;
            }
            return prev - 1;
          });
        }, interval);
      };

      delayTimeoutRef.current = setTimeout(() => {
        startCountdown();
      }, delay);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, [duration, onComplete, resetTrigger, delay, isStarted]);

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
      {showPercentage && (
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
          {percentage}%
        </div>
      )}
    </div>
  );
};

export default CountdownProgressBar;