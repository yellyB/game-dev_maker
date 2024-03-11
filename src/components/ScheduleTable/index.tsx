import { useState } from "react";
import styled from "styled-components";
import SelectedSchedule from "./SelectedSchedule";
import ScheduleList from "./ScheduleList";
import { useSchedulesContext } from "../../context/schedules.context";
import Button from "../Button";

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
      <ButtonWrapper>
        <Button onClick={clear}>clear</Button>
        <Button
          onClick={handleExuceteOnClick}
          disabled={selectedSchedules.length !== 4}
        >
          execute
        </Button>
      </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: flex-end;
`;

const Content = styled.div`
  border: 1px solid blue;

  display: flex;
  flex-direction: row;
`;
