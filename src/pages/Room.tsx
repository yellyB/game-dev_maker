import { useState } from "react";
import styled from "styled-components";
import { PointOfUserState } from "~/types";
import { END_MONTH } from "datas/constantDatas";

import Overlay from "../components/Overlay";
import ScheduleExecutionProgress from "../components/ScheduleExecutionProgress";
import GameState from "../components/GameState";
import ScheduleTable from "../components/ScheduleTable";
import { useSchedulesContext } from "../context/schedules.context";
import { useGameContext } from "../context/game.context";
import { useEndingType } from "../hooks/useEndingType";
import Dialog from "../components/Dialog";
import Button from "../components/Button";

export default function Room() {
  const { gameState, updateGameState, month, moveToNextMonth } =
    useGameContext();
  const { clear } = useSchedulesContext();
  const [ending, isTurtleEnding] = useEndingType();

  const [IsDialogOpen, setIsDialogOpen] = useState(false);
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

    // todo: 거북이 엔딩은 실행 도중에도 볼 수 있는 엔딩으로 수정
    if (isTurtleEnding) {
      updateGameState("end");
      return;
    }

    clear();

    setIsDialogOpen(true);
  };

  const handleDialogOnConfirm = () => {
    moveToNextMonth();

    if (month === END_MONTH) {
      setTimeout(() => {
        updateGameState("end");
      }, 1000);
    }
  };

  return (
    <>
      <Background className="container">
        <GameState />
        <Overlay isShow={showOverlay} onClose={() => setShowOverlay(false)}>
          <ScheduleTable open={isTimeTableOpen} onExecute={handleExecute} />
        </Overlay>
        {isScheduleExcuting && (
          <ScheduleExecutionProgress onEnd={handleOnEnd} />
        )}
        <ButtonContainer>
          <Button
            onClick={() => {
              setIsTimeTableOpen(true);
              setShowOverlay(true);
            }}
            disabled={isScheduleExcuting}
          >
            timetable open
          </Button>
          <Button onClick={() => setIsDialogOpen(true)}>다이얼로그 오픈</Button>
        </ButtonContainer>
      </Background>
      <Dialog
        isOpen={IsDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="이번달 실행 결과"
        onConfirm={handleDialogOnConfirm}
      >
        <p>{JSON.stringify(updatedValueOfCurrInterval)}</p>
      </Dialog>
    </>
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
`;
