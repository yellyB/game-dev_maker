import { useMemo, useState } from "react";
import styled from "styled-components";
import Overlay from "../components/Overlay";
import ScheduleExecutionProgress from "../components/ScheduleExecutionProgress";
import GameState from "../components/GameState";
import ScheduleTable from "../components/ScheduleTable";
import { currentMonth } from "../datas/userData";
import { useSchedulesContext } from "../context/schedules.context";
import { END_MONTH } from "../datas/staticData";
import { useGameContext } from "../context/game.context";
import { useEndingType } from "../hooks/useEndingType";
import { useStateContext } from "../context/state.context";
import { PointOfUserState } from "../types";

export default function Room() {
  const { gameState, update: updateGameState } = useGameContext();
  const { clear } = useSchedulesContext();
  const { state } = useStateContext();
  const [ending, isTurtleEnding] = useEndingType();

  const [isTimeTableOpen, setIsTimeTableOpen] = useState(false);
  const [isScheduleExcuting, setIsScheduleExcuting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [updatedValueOfCurrInterval, setUpdatedValueOfCurrInterval] = useState(
    {}
  );

  const handleExecute = () => {
    setIsTimeTableOpen(false);
    setShowOverlay(false);
    setIsScheduleExcuting(true);
  };

  const handleOnEnd = (updatedValueOfCurrInterval: PointOfUserState) => {
    setIsScheduleExcuting(false);
    setUpdatedValueOfCurrInterval(updatedValueOfCurrInterval);

    if (isTurtleEnding) {
      updateGameState("end");
      return;
    }

    currentMonth.moveToNextMonth();

    if (currentMonth.getMonth() === END_MONTH) {
      updateGameState("end");
    }

    // todo: 마지막꺼 반영 안되고 있음.
    // todo: 팝업창으로 띄위기
    // todo: 실시간 값 변경 말고 누적하고 있다가 한번에 값을 변경하기로 해야하나? 고민해보기
    alert(`이번달 실행 결과: ${JSON.stringify(updatedValueOfCurrInterval)}`);

    clear();
  };

  return (
    <Background className="container">
      <GameState />
      <Overlay isShow={showOverlay} onClose={() => setShowOverlay(false)}>
        <ScheduleTable open={isTimeTableOpen} onExecute={handleExecute} />
      </Overlay>

      {isScheduleExcuting && <ScheduleExecutionProgress onEnd={handleOnEnd} />}
      <ButtonContainer>
        <button
          onClick={() => {
            setIsTimeTableOpen(true);
            setShowOverlay(true);
          }}
          disabled={isScheduleExcuting}
        >
          timetable open
        </button>
      </ButtonContainer>
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url("/images/home.png");
  background-size: cover;
  background-position: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 100px;
  button {
    display: block;
  }
`;
