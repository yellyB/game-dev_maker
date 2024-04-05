import styled from "styled-components";
import { useStateContext } from "../context/state.context";
import { MAX_POINT } from "../datas/constantDatas";
import { comma } from "../common/utils";

export default function GameState() {
  const { state } = useStateContext();

  return (
    <Container>
      <Row>{state.name}의 능력치</Row>
      <br />
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
  min-width: 160px;
  height: 80%;
  padding: 20px 60px;
  line-height: 160%;

  background-color: #000000;
  opacity: 0.7;

  font-size: 20px;
  color: white;
`;

const Row = styled.div``;
