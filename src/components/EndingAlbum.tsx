import { useState } from "react";
import styled from "styled-components";
import { useStateContext } from "../context/state.context";
import { MAX_POINT } from "../datas/constantDatas";
import { comma } from "../common/utils";
import { colors } from "datas/colors";
import { EndingDataSet, endingCode } from "../pages/Ending";

export default function EndingAlbum() {
  const { state } = useStateContext();

  // todo: Ending에 있는 데이터와 동기화 시키기
  const endingDatas: (EndingDataSet & { guide: string })[] = [
    {
      code: "majorCompany",
      title: "대기업 취업",
      description: "원하는걸 이뤄냈군요! 부모님이 기뻐하시겠어요.",
      imageUrl:
        "https://yellyb.github.io/game-dev_maker/images/ending/majorCompany.png",
      guide: "개발력 & 사회성 모두 중요",
    },
    {
      code: "freelancer",
      title: "커뮤니티 사이트 운영자",
      description: "집이 곧 일터. 내향인이라면 최고의 직업일수도..??",
      imageUrl:
        "https://yellyb.github.io/game-dev_maker/images/ending/freelancer.png",
      guide: "개발력 중요",
    },
    {
      code: "selfEmployed",
      title: "치킨집 사장",
      description: "뜻대로는 되지 않았지만.. 뭐, 이런게 인생이죠.",
      imageUrl:
        "https://yellyb.github.io/game-dev_maker/images/ending/selfEmployed.png",
      guide: "특이 사항만 없다면 도달 가능",
    },
    {
      code: "coinInvestor",
      title: "코인투자자로 인생역전",
      description: "역시 인생은 한방이죠!",
      imageUrl:
        "https://yellyb.github.io/game-dev_maker/images/ending/coinInvestor.png",
      guide: "코인 맛을 한번 보면..",
    },
    {
      code: "becomeTurtle",
      title: "거북이가 되다",
      description: '"' + "...... 바른 자세로 살걸 그랬어." + '"',
      imageUrl:
        "https://yellyb.github.io/game-dev_maker/images/ending/becomeTurtle.png",
      guide: "건강을 소중히 하지 않은 대가",
    },
  ];

  return (
    <Container>
      {endingDatas.map((ending) => (
        <Wrapper>
          <Thumbnail src={ending.imageUrl} />
          <Guide>{ending.guide}</Guide>
        </Wrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  background-color: ${colors.black};
  padding: 50px;
  border-radius: 6px;
`;

const Wrapper = styled.div``;

const Thumbnail = styled.img`
  width: 170px;
  border-radius: 2px;
  &:hover {
    opacity: 0.3;
  }
`;

const Guide = styled.div`
  color: ${colors.lightGray};
  text-align: center;
  word-break: keep-all;
  margin-top: 6px;
`;
