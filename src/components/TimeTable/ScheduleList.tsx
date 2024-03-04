import { useEffect, useState } from "react";
import styled from "styled-components";
import { schedule, schedules } from "../../datas/schedules";
import { Schedule } from "../../types";

function ScheduleList() {
  const handleScheduleOnClick = (selectedSchedule: Schedule) => {
    console.log(selectedSchedule);
    schedule.set(selectedSchedule);
  };

  useEffect(() => {
    console.log(schedule.get());
  }, [schedule]);

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
              {schedule.name}
            </Item>
          ))}
        </Group>
      ))}
    </Container>
  );
}

const Container = styled.div`
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
  border: 1px solid lightgray;
  border-radius: 6px;
  margin: 2px 0;
  padding: 10px 12px;

  &:hover {
    background-color: lightblue;
  }
  &:active {
    background-color: black;
    color: white;
  }
`;

export default ScheduleList;
