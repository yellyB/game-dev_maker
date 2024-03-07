import React, { createContext, useContext, useState } from "react";
import { Schedule, SelectedSchedule } from "../types";

interface Props {
  children: React.ReactNode;
}

const ScheduleContext = createContext<{
  data: SelectedSchedule[];
  set: (value: Schedule) => void;
  pop: () => void;
  clear: () => void;
}>({ data: [], set: () => {}, pop: () => {}, clear: () => {} });

export const useScheduleContext = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }: Props) => {
  const [schedule, setSchedule] = useState<SelectedSchedule[]>([]);

  const set = (value: Schedule) => {
    if (schedule.length >= 4) return;

    // todo: 중간에 삭제된게 있으면 중간에 끼워넣을 수 있도록 추후 개선
    setSchedule([...schedule, { ...value, index: schedule.length }]);
  };

  const pop = () => {
    setSchedule(schedule.slice(0, schedule.length - 1));
  };

  const clear = () => {
    setSchedule([]);
  };

  return (
    <ScheduleContext.Provider value={{ data: schedule, set, pop, clear }}>
      {children}
    </ScheduleContext.Provider>
  );
};
