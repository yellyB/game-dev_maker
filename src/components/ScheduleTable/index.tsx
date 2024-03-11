import { useState } from "react";
import styled from "styled-components";
import SelectedSchedule from "./SelectedSchedule";
import ScheduleList from "./ScheduleList";
import { useSchedulesContext } from "../../context/schedules.context";

export default function ScheduleTable({
  open,
  onExecute,
}: {
  open: boolean;
  onExecute: () => void;
}) {
  const { selectedSchedules, clear } = useSchedulesContext();

  const handleExuceteOnClick = () => {
    onExecute();
  };

  return (
    <Container open={open}>
      <Content>
        <SelectedSchedule />
        <ScheduleList />
      </Content>
      <ButtonContainer>
        <Button onClick={clear}>clear</Button>
        <button
          onClick={handleExuceteOnClick}
          disabled={selectedSchedules.length !== 4}
        >
          execute
        </button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "display" : "none")};
  // position: absolute;
  // top: 100px;
  // width: 100%;
  // height: 100%;
  background: #fff;

  border: 1px solid blue;
`;

const ButtonContainer = styled.div`
  height: 60px;
  border: 1px solid blue;
`;
const Button = styled.button``;

const Content = styled.div`
  border: 1px solid blue;

  display: flex;
  flex-direction: row;
`;
