import { useState } from "react";
import styled from "styled-components";
import { schedules } from "../../datas";

function ScheduleList() {
  console.log(schedules);
  return (
    <Container>
      [스케줄 목록]
      {schedules.map((schedule) => (
        <Item>{schedule.name}</Item>
      ))}
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid pink;
`;

const Item = styled.div`
  border: 1px solid yellow;
`;

export default ScheduleList;
