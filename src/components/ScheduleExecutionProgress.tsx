import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSchedulesContext } from "../context/schedules.context";
import { useStateContext } from "../context/state.context";
import { SCHEDULE_EXECUTING_TIME } from "../datas/staticData";
import { SelectedSchedule } from "../types";

interface Props {
  onEnd: () => void;
}

export default function ScheduleExecutionProgress({ onEnd }: Props) {
  const { selectedSchedules, set, pop, clear } = useSchedulesContext();
  const { state, update } = useStateContext();

  const [index, setIndex] = useState(0);
  const [runningSchedule, setRunningSchedule] = useState<SelectedSchedule>(
    selectedSchedules[0]
  );

  useEffect(() => {
    if (!selectedSchedules) return;

    const intervalId = setInterval(() => {
      if (index < selectedSchedules.length - 1) {
        const currSchedule = selectedSchedules[index];
        update({
          money:
            state.money +
            (currSchedule.name === "코인 투자"
              ? Math.floor(Math.random() * 600000) - 300000
              : currSchedule.money),
          codingSkillPoint:
            state.codingSkillPoint + currSchedule.codingSkillPoint,
          socialSkillPoint:
            state.socialSkillPoint + currSchedule.socialSkillPoint,
          stressPoint: state.stressPoint + currSchedule.stressPoint,
          turtleNeckPoint: state.turtleNeckPoint + currSchedule.turtleNeckPoint,
        });

        setIndex((prevIndex) => prevIndex + 1);
        setRunningSchedule(selectedSchedules[index + 1]);
      } else {
        clearInterval(intervalId);
        onEnd();
        // todo: 스케줄 종료된 후 한달간 어떤 값이 변화했는지 알려주는 창
      }
    }, SCHEDULE_EXECUTING_TIME);

    return () => clearInterval(intervalId);
  }, [index, selectedSchedules]);

  return (
    <>
      {runningSchedule && (
        <Container>{runningSchedule.name} 스케줄 실행 중...</Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 50%;
  height: 50%;
  border: 3px solid green;
`;
