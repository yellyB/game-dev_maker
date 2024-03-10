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
  const { selectedSchedules, set, pop, clear } = useSchedulesContext();
  const { state } = useStateContext();
  const [ending, isTurtleEnding] = useEndingType();

  const [isTimeTableOpen, setIsTimeTableOpen] = useState(false);
  const [isScheduleExcuting, setIsScheduleExcuting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [updatedValueOfCurrInterval, setUpdatedValueOfCurrInterval] = useState(
    {}
  );

  const handleExuceteOnClick = () => {
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

    // todo: 팝업창으로 띄위기
    alert(`이번달 실행 결과: ${JSON.stringify(updatedValueOfCurrInterval)}`);

    clear();
  };

  return (
    <Background className="container">
      <GameState />
      <Overlay isShow={showOverlay} onClose={() => setShowOverlay(false)}>
        <ScheduleTable
          open={isTimeTableOpen}
          onClose={() => setIsTimeTableOpen(false)}
        />
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
        <button
          onClick={handleExuceteOnClick}
          disabled={selectedSchedules.length !== 4 || isScheduleExcuting}
        >
          execute
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
