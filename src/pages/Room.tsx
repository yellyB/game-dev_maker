import { useState } from "react";
import styled from "styled-components";
import Scheduling from "../components/Scheduling";
import TimeTable from "../components/TimeTable";

function Room() {
  const [isTimeTableOpen, setIsTimeTableOpen] = useState(true);
  const [isScheduling, setIsScheduling] = useState(false);

  const handleExuceteOnClick = () => {
    setIsScheduling(true);

    setTimeout(() => {
      setIsScheduling(false);
    }, 1000);
  };

  return (
    <>
      <Background>
        <Content>{isScheduling && <Scheduling />}</Content>
        <ButtonContainer>
          <button onClick={() => setIsTimeTableOpen(true)}>
            timetable open
          </button>
          <button onClick={handleExuceteOnClick}>execute</button>
        </ButtonContainer>
      </Background>
      <TimeTable
        isOpen={isTimeTableOpen}
        onClose={() => setIsTimeTableOpen(false)}
      />
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
`;

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
