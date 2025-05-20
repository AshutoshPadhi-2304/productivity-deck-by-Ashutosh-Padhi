import { TIMER_MODES } from "constants/pomodoro";

import React, { useState, useEffect } from "react";

import classNames from "classnames";
import i18n from "i18next";
import { Button, Typography, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

const Pomodoro = () => {
  const [activeMode, setActiveMode] = useState(TIMER_MODES[0].name);
  const [activeTimer, setActiveTimer] = useState(TIMER_MODES[0].duration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionNumber, setSessionNumber] = useState(1);

  const { t } = useTranslation();

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
            const isPomodoro = activeMode === "pomodoro";
            const longBreakMode = (sessionNumber + 1) % 4 === 0;
            const nextMode = isPomodoro
              ? longBreakMode
                ? "longBreak"
                : "shortBreak"
              : "pomodoro";

            Toastr.info(
              t("message.sessionEnd", {
                session: t(`label.pomodoro.modes.${activeMode}`),
              }),
              {
                autoClose: 2000,
              }
            );
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
      <Typography
        className="mb-28 ml-12 mt-6 self-start text-4xl"
        style="h1"
        weight="bold"
      >
        {t("label.modes.pomodoro")}
      </Typography>
      <div className="w-auto rounded-md border-2 border-gray-500 p-8 text-center">
        <div className="mb-6 flex justify-center gap-4">
          {TIMER_MODES.map(({ id, duration, name }) => (
            <Button
              key={id}
              label={t(`label.pomodoro.modes.${name}`)}
              size="medium"
              style="tertiary"
              className={classNames("bg-transparent", {
                "bg-gray-800 font-bold text-white": activeMode === name,
              })}
              tooltipProps={{
                content: t("label.pomodoro.changeMode", {
                  mode: t(`label.pomodoro.modes.${name}`),
                }),
                position: "top",
              }}
              onClick={() => {
                setActiveTimer(duration);
                setIsTimerRunning(false);
                setActiveMode(name);
              }}
            />
          ))}
        </div>
        <div className="m-8 text-7xl font-bold">
          {formatTime(activeTimer || 0)}
        </div>
        <Button
          style="tertiary"
          className={classNames(
            "rounded-md bg-transparent p-2 text-2xl font-bold hover:bg-gray-700 hover:text-white",
            { "bg-gray-900 text-white": isTimerRunning }
          )}
          label={
            isTimerRunning
              ? t("label.pomodoro.pause")
              : t("label.pomodoro.start")
          }
          onClick={handleIsTimerRunning}
        />
      </div>
    </div>
  );
};

export default withTitle(Pomodoro, i18n.t("title.pomodoro"));
