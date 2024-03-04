import styled from "styled-components";

function ScheduleExecutionProgress() {
  return <Container>스케줄 실행 중...</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid green;
`;

export default ScheduleExecutionProgress;
