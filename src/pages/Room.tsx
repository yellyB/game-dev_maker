import { useState } from "react";
import styled from "styled-components";
import ScheduleExecutionProgress from "../components/ScheduleExecutionProgress";
import Status from "../components/Status";
import TimeTable from "../components/TimeTable";
import { currentMonth } from "../datas/userData";

function Room() {
  const [isTimeTableOpen, setIsTimeTableOpen] = useState(false);
  const [isScheduleExcuting, setIsScheduleExcuting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleExuceteOnClick = () => {
    setIsScheduleExcuting(true);

    setTimeout(() => {
      setIsScheduleExcuting(false);
      currentMonth.moveToNextMonth();
    }, 1000);
  };

  return (
    <>
      <Background className="container">
        <Content style={{ border: "3px solid purple" }}>
          <Status />
          {/* todo: overlay 따로 컴포넌트 분리 */}
          {showOverlay && (
            <Overlay onClick={() => setShowOverlay(false)}>
              <OverlayContent
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }
              >
                <TimeTable
                  isOpen={isTimeTableOpen}
                  onClose={() => setIsTimeTableOpen(false)}
                />
              </OverlayContent>
            </Overlay>
          )}

          {isScheduleExcuting && <ScheduleExecutionProgress />}
        </Content>
        <ButtonContainer>
          <button
            onClick={() => {
              setIsTimeTableOpen(true);
              setShowOverlay(true);
            }}
          >
            timetable open
          </button>
          <button onClick={handleExuceteOnClick}>execute</button>
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 색상과 투명도 조절 */
  z-index: 999; /* 다른 요소 위에 오도록 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayContent = styled.div``;

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

export default Room;
