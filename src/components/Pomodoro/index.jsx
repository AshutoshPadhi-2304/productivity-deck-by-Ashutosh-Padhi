import React, { useState, useEffect } from "react";

import { TIMER_MODES } from "components/constants";
import { Button } from "neetoui";

const Pomodoro = () => {
  const [activeMode, setActiveMode] = useState(TIMER_MODES[0].name);
  const [activeTimer, setActiveTimer] = useState(TIMER_MODES[0].duration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionNumber, setSessionNumber] = useState(1);

  const handleIsTimerRunning = () => {
    setIsTimerRunning((prevStartTimer) => !prevStartTimer);
  };

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!isTimerRunning) return () => {};

    const interval = setInterval(
      () =>
        setActiveTimer((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsTimerRunning(false);
            const isPomodoro = activeMode === "Pomodoro";
            const longBreakMode = (sessionNumber + 1) % 4 === 0;
            const nextMode = isPomodoro
              ? longBreakMode
                ? "Long Break"
                : "Short Break"
              : "Pomodoro";
            setActiveMode(nextMode);
            setSessionNumber(isPomodoro ? sessionNumber : sessionNumber + 1);
            setActiveTimer(
              TIMER_MODES.filter((mode) => mode.name === nextMode)[0].duration
            );

            setTimeout(() => {
              setIsTimerRunning(true);
            }, 1000);

            return 0;
          }
          console.log(activeMode, isTimerRunning, sessionNumber);

          return prevTime - 1;
        }),
      1000
    );

    return () => {
      clearInterval(interval);
      setIsTimerRunning(false);
    };
  }, [isTimerRunning, activeMode]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="mb-28 ml-12 mt-6 self-start text-4xl font-bold">
        Pomodoro mode
      </h1>
      <div className="w-auto rounded-md border-2 border-gray-500 p-8 text-center">
        <div className="mb-6 flex justify-center gap-4">
          {TIMER_MODES.map((mode) => (
            <Button
              key={mode.id}
              label={mode.name}
              size="medium"
              style="tertiary"
              className={`bg-transparent ${
                activeMode === mode.name
                  ? "bg-gray-800 font-bold text-white"
                  : ""
              }`}
              onClick={() => {
                setActiveTimer(mode.duration);
                setIsTimerRunning(false);
                setActiveMode(mode.name);
              }}
            />
          ))}
        </div>
        <div className="m-8 text-7xl font-bold">
          {formatTime(activeTimer || 0)}
        </div>
        <Button
          label={isTimerRunning ? "Pause" : "Start"}
          style="tertiary"
          className={`rounded-md bg-transparent p-2 text-2xl font-bold hover:bg-gray-700 hover:text-white ${
            isTimerRunning ? "bg-gray-900 text-white" : ""
          }`}
          onClick={handleIsTimerRunning}
        />
      </div>
    </div>
  );
};

export default Pomodoro;
