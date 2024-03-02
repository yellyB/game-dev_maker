import { useState } from "react";
import styled from "styled-components";
import Scheduling from "../components/Scheduling";
import TimeTable from "../components/TimeTable";

function Room() {
  const [isTimeTableOpen, setIsTimeTableOpen] = useState(true);
  const [isScheduleExcuting, setIsScheduleExcuting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleExuceteOnClick = () => {
    setIsScheduleExcuting(true);

    setTimeout(() => {
      setIsScheduleExcuting(false);
    }, 1000);
  };

  return (
    <>
      <Background className="container">
        <Content>
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

          {isScheduleExcuting && <Scheduling />}
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background-image: url("/images/home.png");
  background-size: cover;
  background-position: center;

  .container {
    position: relative;
  }
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
  width: 50%;
  height: 50%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 100px;
  right: 300px;
  button {
    display: block;
  }
`;

export default Room;
