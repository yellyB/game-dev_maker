import { useEffect, useState } from "react";
import styled from "styled-components";
import { PointOfUserState, SelectedSchedule, UserState } from "types";
import { useSchedulesContext } from "../context/schedules.context";
import { useStateContext } from "../context/state.context";
import { SCHEDULE_EXECUTING_TIME } from "../datas/constantDatas";

interface Props {
  onEnd: (updatedValueOfCurrInterval: PointOfUserState) => void;
}

const images = ["동작1.png", "동작2.png", "동작3.png"];

export default function ScheduleExecutionProgress({ onEnd }: Props) {
  const { selectedSchedules, set, pop, clear } = useSchedulesContext();
  const { state, updatePoints } = useStateContext();

  const IMAGES_LEN = images.length;
  const [imageIndex, setImageIndex] = useState(0);
  const [index, setIndex] = useState(0);

  const [currRunningSchedule, setCurrRunningSchedule] =
    useState<SelectedSchedule>(selectedSchedules[0]);
  const [errorMessage, setErrorMessage] = useState("");
  const [accumulatedValue, setAccumulatedValue] = useState<
    Omit<UserState, "name">
  >({
    money: 0,
    codingSkillPoint: 0,
    socialSkillPoint: 0,
    stressPoint: 0,
    turtleNeckPoint: 0,
  });

  const filterNegativeValue = (object: { [key: string]: number }) => {
    return Object.fromEntries(
      Object.entries(object).filter(([key, value]) => value >= 0)
    ) as Omit<UserState, "name">;
  };

  useEffect(() => {
    if (!selectedSchedules) return;

    const imageInterval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % IMAGES_LEN);
    }, SCHEDULE_EXECUTING_TIME / IMAGES_LEN);

    const scheduleInterval = setInterval(() => {
      console.log("2:", index);
      setErrorMessage(() => "");
      setIndex((prevIndex) => prevIndex + 1);

      if (index < selectedSchedules.length) {
        setCurrRunningSchedule(selectedSchedules[index]);

        const currSchedule = selectedSchedules[index];
        const futureMoney = state.money + currSchedule.money;
        // todo: 돈 없으면 실행화면의 한 프레임도 보여주면 안됨.
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

        updatePoints(filterNegativeValue(newValue));

        // todo: 실시간 값 변경 말고 누적하고 있다가 한번에 값을 변경하기로 해야하나? 고민해보기
        setAccumulatedValue((prevValue) =>
          filterNegativeValue({
            money: prevValue.money + thisMoney,
            codingSkillPoint:
              prevValue.codingSkillPoint + currSchedule.codingSkillPoint,
            socialSkillPoint:
              prevValue.socialSkillPoint + currSchedule.socialSkillPoint,
            stressPoint: prevValue.stressPoint + currSchedule.stressPoint,
            turtleNeckPoint:
              prevValue.turtleNeckPoint + currSchedule.turtleNeckPoint,
          })
        );
      } else {
        clearInterval(imageInterval);
        clearInterval(scheduleInterval);
        onEnd(accumulatedValue);
      }
    }, SCHEDULE_EXECUTING_TIME);

    return () => {
      clearInterval(imageInterval);
      clearInterval(scheduleInterval);
    };
  }, [index]);

  return (
    <Container>
      {currRunningSchedule.name}
      {!!errorMessage ? (
        errorMessage
      ) : (
        <img
          src={`/images/${images[imageIndex]}`}
          alt={`Image ${imageIndex + 1}`}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 50%;
  height: 50%;
  border: 3px solid green;
`;
