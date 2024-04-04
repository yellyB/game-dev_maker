import styled from "styled-components";
import { useSchedulesContext } from "context/schedules.context";
import { useGameContext } from "context/game.context";
import { colors } from "datas/colors";
import Divider from "../Divider";

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
            <Divider direction="vertical" thickness={1} />
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
  padding: 18px;
`;

const Table = styled.div``;
const Row = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin: 5px;
  border-radius: 6px;
  border: 1px solid ${colors.lightGray};
`;

const Cell = styled.div`
  padding: 10px 14px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 15px;
`;

const Label = styled(Cell)`
  width: 16%;
`;
