import { useState } from "react";
import { Schedule } from "../types";

export default function useSchedule() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const set = (value: Schedule) => {
    setSchedule([...schedule, value]);
  };

  const slice = () => {
    setSchedule(schedule.slice(0, schedule.length - 1));
  };

  const clear = () => {
    setSchedule([]);
  };

  return [schedule, set, slice, clear] as const;
}
