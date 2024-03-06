import styled from "styled-components";
import { status, currentMonth } from "../datas/userData";
import { comma } from "../utils";

export default function Status() {
  return (
    <Container>
      <Row>진행중인 월: {currentMonth.getMonth()}월</Row>
      <Row>{status.name}의 스탯</Row>
      <Row>소지금: {comma(status.money)}원</Row>
      <Row>
        개발력: {status.codingSkillPoint}/{status.maxPoint}
      </Row>
      <Row>
        사회성: {status.socialSkillPoint}/{status.maxPoint}
      </Row>
      <Row>
        스트레스: {status.stressPoint}/{status.maxPoint}
      </Row>
    </Container>
  );
}

const Container = styled.div`
  background: palegreen;

  position: absolute;
  width: 300px;
  height: 200px;

  top: 0;
  right: 0px;
`;

const Row = styled.div``;
