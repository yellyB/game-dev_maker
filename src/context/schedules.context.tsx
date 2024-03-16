import React, { createContext, useContext, useState } from "react";
import { Schedule, SelectedSchedule } from "types";

interface Props {
  children: React.ReactNode;
}

const ScheduleContext = createContext<{
  selectedSchedules: SelectedSchedule[];
  set: (value: Schedule) => void;
  pop: () => void;
  clear: () => void;
}>({ selectedSchedules: [], set: () => {}, pop: () => {}, clear: () => {} });

export const useSchedulesContext = () => useContext(ScheduleContext);

export const SchedulesProvider = ({ children }: Props) => {
  const [schedules, setSchedules] = useState<SelectedSchedule[]>([]);

  const set = (value: Schedule) => {
    if (schedules.length >= 4) return;

    // todo: 중간에 삭제된게 있으면 중간에 끼워넣을 수 있도록 추후 개선
    setSchedules([...schedules, { ...value, index: schedules.length }]);
  };

  const pop = () => {
    setSchedules(schedules.slice(0, schedules.length - 1));
  };

  const clear = () => {
    setSchedules([]);
  };

  return (
    <ScheduleContext.Provider
      value={{ selectedSchedules: schedules, set, pop, clear }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
