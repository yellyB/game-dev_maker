import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSchedulesContext } from "../context/schedules.context";
import { useStateContext } from "../context/state.context";
import { SCHEDULE_EXECUTING_TIME } from "../datas/staticData";
import { PointOfUserState, SelectedSchedule } from "../types";

interface Props {
  onEnd: (updatedValueOfCurrInterval: PointOfUserState) => void;
}

export default function ScheduleExecutionProgress({ onEnd }: Props) {
  const { selectedSchedules, set, pop, clear } = useSchedulesContext();
  const { state, update } = useStateContext();

  const [index, setIndex] = useState(0);
  const [runningSchedule, setRunningSchedule] = useState<SelectedSchedule>(
    selectedSchedules[0]
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [accumulatedValue, setAccumulatedValue] = useState({
    money: 0,
    codingSkillPoint: 0,
    socialSkillPoint: 0,
    stressPoint: 0,
    turtleNeckPoint: 0,
  });

  useEffect(() => {
    if (!selectedSchedules) return;

    const intervalId = setInterval(() => {
      if (index < selectedSchedules.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
        setRunningSchedule(selectedSchedules[index + 1]);

        const currSchedule = selectedSchedules[index];
        const futureMoney = state.money + currSchedule.money;
        if (futureMoney < 0 && currSchedule.name !== "코인 투자") {
          setErrorMessage("소지금이 부족하여 스케줄을 실행할 수 없습니다.");
          return;
        }

        const thisMoney =
          currSchedule.name === "코인 투자"
            ? Math.floor(Math.random() * 600000) - 300000
            : currSchedule.money;
        const newValue = {
          money: state.money + thisMoney,
          codingSkillPoint:
            state.codingSkillPoint + currSchedule.codingSkillPoint,
          socialSkillPoint:
            state.socialSkillPoint + currSchedule.socialSkillPoint,
          stressPoint: state.stressPoint + currSchedule.stressPoint,
          turtleNeckPoint: state.turtleNeckPoint + currSchedule.turtleNeckPoint,
        };

        update({
          ...newValue,
        });

        setAccumulatedValue((prevValue) => ({
          money: prevValue.money + thisMoney,
          codingSkillPoint:
            prevValue.codingSkillPoint + currSchedule.codingSkillPoint,
          socialSkillPoint:
            prevValue.socialSkillPoint + currSchedule.socialSkillPoint,
          stressPoint: prevValue.stressPoint + currSchedule.stressPoint,
          turtleNeckPoint:
            prevValue.turtleNeckPoint + currSchedule.turtleNeckPoint,
        }));

        console.log(newValue, accumulatedValue);
      } else {
        clearInterval(intervalId);
        onEnd(accumulatedValue);
      }
    }, SCHEDULE_EXECUTING_TIME);

    return () => clearInterval(intervalId);
  }, [index, selectedSchedules]);

  return (
    <>
      {runningSchedule && (
        <Container>
          {runningSchedule.name}
          {!!errorMessage ? errorMessage : "스케줄 실행 중..."}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 50%;
  height: 50%;
  border: 3px solid green;
`;
