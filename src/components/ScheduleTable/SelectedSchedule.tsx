import { useEffect, useState } from "react";
import styled from "styled-components";
import { currentMonth } from "../../datas/userData";
import useSchedule from "../../hooks/useSchedule";

export default function ScheduleTable() {
  const [schedule, setSchedule] = useSchedule();

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <Container>
      <h2>{currentMonth.getMonth()}월 스케줄</h2>
      <Table>
        {schedule.map((val) => (
          <>{val.category}</>
        ))}
        {Array.from({ length: 4 }, (_, index) => index + 1).map((week) => (
          <Row key={week}>
            <Cell>{week}주</Cell>
            <Divider />
            <Cell>-</Cell>
          </Row>
        ))}
      </Table>
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  padding: 30px;
`;

const Table = styled.div``;
const Row = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin: 5px;
  border-radius: 6px;
  border: 1px solid lightgray;
`;

const Cell = styled.div`
  padding: 5px 10px;
  width: 20%;
  display: flex;
  justify-content: center;
`;

const Divider = styled.div`
  width: 1px;
  background-color: lightgray;
  height: 100%;
`;
