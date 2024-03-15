import styled from "styled-components";
import { useSchedulesContext } from "context/schedules.context";
import { useGameContext } from "context/game.context";

export default function ScheduleTable() {
  const { selectedSchedules } = useSchedulesContext();
  const { month } = useGameContext();

  return (
    <Container>
      <h2>{month}월 스케줄</h2>
      <Table>
        {Array.from({ length: 4 }, (_, i) => i + 1).map((week, index) => (
          <Row key={week}>
            <Label>{week}주</Label>
            <Divider />
            {typeof selectedSchedules[index] !== "undefined" && (
              <Cell className="value">{selectedSchedules[index].name}</Cell>
            )}
          </Row>
        ))}
      </Table>
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
  padding: 10px 18px;
  display: flex;
  justify-content: center;
`;

const Label = styled(Cell)`
  width: 16%;
`;

const Divider = styled.div`
  width: 1px;
  background-color: lightgray;
  height: 100%;
`;
