import styled from "styled-components";
import { useSchedulesContext } from "../../context/schedules.context";
import { schedules } from "../../static/datas/schedules";
import { comma } from "../../common/utils";
import { Schedule } from "~/types";

export default function ScheduleList() {
  const { set: setSchedule } = useSchedulesContext();

  const handleScheduleOnClick = (selectedSchedule: Schedule) => {
    setSchedule(selectedSchedule);
  };

  return (
    <Container>
      [스케줄 목록]
      {schedules.map((scheduleGroup) => (
        <Group key={scheduleGroup.category}>
          <GroupName>{scheduleGroup.categoryName}</GroupName>
          {scheduleGroup.schedules.map((schedule) => (
            <Item
              key={schedule.key}
              onClick={() => handleScheduleOnClick(schedule)}
            >
              <Row>{schedule.name}</Row>
              <SubRow>
                {schedule.name === "코인 투자"
                  ? "알 수 없음"
                  : `${comma(schedule.money)} 원`}
              </SubRow>
            </Item>
          ))}
        </Group>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 250px;
  border: 1px solid pink;
`;

const Group = styled.div`
  margin: 6px;
  border: 1px solid yellow;
`;
const GroupName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const Item = styled.div`
  display: flex;
  // flex-direction: column;
  // gap: 2px;
  border: 1px solid lightgray;
  border-radius: 6px;
  margin: 2px 0;
  padding: 10px 18px;
  flex-gap: 4px;

  &:hover {
    background-color: lightblue;
  }
  &:active {
    background-color: black;
    color: white;
  }
`;

const Row = styled.div`
  width: 60%;
  font-weight: bold;
`;
const SubRow = styled.div`
  font-size: 14px;
  color: red;
`;
