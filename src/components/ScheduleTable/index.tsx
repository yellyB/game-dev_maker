import { useState } from "react";
import styled from "styled-components";
import SelectedSchedule from "./SelectedSchedule";
import ScheduleList from "./ScheduleList";
import { useSchedulesContext } from "../../context/schedules.context";
import Button from "../Button";
import { colors } from "datas/colors";
import { MAX_SCHEDULE_COUNT } from "datas/constantDatas";
import Divider from "../Divider";

export default function ScheduleTable({
  onExecute,
}: {
  onExecute: () => void;
}) {
  const { selectedSchedules, clear } = useSchedulesContext();

  const handleExuceteOnClick = () => {
    onExecute();
  };

  return (
    <Container>
      <Content>
        <SelectedSchedule />
        <Divider direction="vertical" thickness={2} length={448} />
        <ScheduleList />
      </Content>

      <Divider direction="horizen" thickness={5} />

      <ButtonWrapper>
        <Button onClick={clear} color={colors.red}>
          초기화
        </Button>
        <Button
          onClick={handleExuceteOnClick}
          disabled={selectedSchedules.length !== MAX_SCHEDULE_COUNT}
          color={colors.green}
        >
          실행
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  background: ${colors.paleGray};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: flex-end;
`;
