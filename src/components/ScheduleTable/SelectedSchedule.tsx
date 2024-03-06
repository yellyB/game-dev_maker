import { useEffect, useState } from "react";
import styled from "styled-components";
import { useScheduleContext } from "../../context/schedule.context";
import { currentMonth } from "../../datas/userData";

export default function ScheduleTable() {
  const { data: schedules, set, pop, clear } = useScheduleContext();

  return (
    <Container>
      <h2>{currentMonth.getMonth()}월 스케줄</h2>
      <Table>
        {Array.from({ length: 4 }, (_, i) => i + 1).map((week, index) => (
          <Row key={week}>
            <Label>{week}주</Label>
            <Divider />
            {typeof schedules[index] !== "undefined" && (
              <Cell className="value">{schedules[index].name}</Cell>
            )}
          </Row>
        ))}
      </Table>
      <Button onClick={clear}>clear</Button>
    </Container>
  );
}

const Container = styled.div`
  width: 350px;
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
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const Label = styled(Cell)`
  width: 20%;
`;

const Divider = styled.div`
  width: 1px;
  background-color: lightgray;
  height: 100%;
`;

const Button = styled.button``;
