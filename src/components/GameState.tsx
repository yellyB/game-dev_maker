import styled from "styled-components";
import { useStateContext } from "../context/state.context";
import { MAX_POINT } from "../datas/staticData";
import { currentMonth } from "../datas/userData";
import { comma } from "../common/utils";

export default function GameState() {
  const { state, update } = useStateContext();

  return (
    <Container>
      <Row>진행중인 월: {currentMonth.getMonth()}월</Row>
      <Row>{state.name}의 스탯</Row>
      <Row>소지금: {comma(state.money)}원</Row>
      <Row>
        개발력: {state.codingSkillPoint}/{MAX_POINT}
      </Row>
      <Row>
        사회성: {state.socialSkillPoint}/{MAX_POINT}
      </Row>
      <Row>
        스트레스: {state.stressPoint}/{MAX_POINT}
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
