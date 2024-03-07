import { useEffect, useState } from "react";
import styled from "styled-components";
import { useScheduleContext } from "../context/schedule.context";
import { SelectedSchedule } from "../types";

interface Props {
  onEnd: () => void;
}

export default function ScheduleExecutionProgress({ onEnd }: Props) {
  const { data: schedules, set, pop, clear } = useScheduleContext();

  const [index, setIndex] = useState(0);
  const [runningSchedule, setRunningSchedule] = useState<SelectedSchedule>(
    schedules[0]
  );

  useEffect(() => {
    if (!schedules) return;

    const intervalId = setInterval(() => {
      if (index < schedules.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
        setRunningSchedule(schedules[index + 1]);
      } else {
        clearInterval(intervalId);
        onEnd();
      }
    }, 1000); // 일단 실행시간 1초로 설정

    return () => clearInterval(intervalId);
  }, [index, schedules]);

  return (
    <>
      {runningSchedule && (
        <Container>{runningSchedule.name} 스케줄 실행 중...</Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid green;
`;
