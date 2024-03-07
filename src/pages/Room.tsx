import { useState } from "react";
import styled from "styled-components";
import Overlay from "../components/Overlay";
import ScheduleExecutionProgress from "../components/ScheduleExecutionProgress";
import Status from "../components/Status";
import ScheduleTable from "../components/ScheduleTable";
import { currentMonth } from "../datas/userData";
import { useScheduleContext } from "../context/schedule.context";

export default function Room() {
  const { data: schedules, set, pop, clear } = useScheduleContext();

  const [isTimeTableOpen, setIsTimeTableOpen] = useState(false);
  const [isScheduleExcuting, setIsScheduleExcuting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleExuceteOnClick = () => {
    setIsScheduleExcuting(true);
  };

  const handleOnEnd = () => {
    setIsScheduleExcuting(false);
    currentMonth.moveToNextMonth();
    clear();
  };

  return (
    <>
      <Background className="container">
        <Content style={{ border: "3px solid purple" }}>
          <Status />
          <Overlay isShow={showOverlay} onClose={() => setShowOverlay(false)}>
            <ScheduleTable
              open={isTimeTableOpen}
              onClose={() => setIsTimeTableOpen(false)}
            />
          </Overlay>

          {isScheduleExcuting && (
            <ScheduleExecutionProgress onEnd={handleOnEnd} />
          )}
        </Content>
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
            disabled={schedules.length !== 4 || isScheduleExcuting}
          >
            execute
          </button>
        </ButtonContainer>
      </Background>
    </>
  );
}

const Background = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-image: url("/images/home.png");
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  //  todo : 임시 스타일. 추후 수정
  width: 50%;
  height: 50%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 100px;
  button {
    display: block;
  }
`;
