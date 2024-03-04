import { useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import ScheduleList from "./ScheduleList";

function TimeTable({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Container open={open}>
      <Header>
        <button onClick={onClose}>close</button>
      </Header>
      <Content>
        <Calendar />
        <ScheduleList />
      </Content>
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

const Header = styled.div`
  border: 1px solid blue;
`;

const Content = styled.div`
  border: 1px solid blue;

  display: flex;
  flex-direction: row;
`;

export default TimeTable;
