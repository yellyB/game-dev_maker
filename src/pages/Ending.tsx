import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useStateContext } from "../context/state.context";
import { useEndingType } from "../hooks/useEndingType";
import { NEEDED_POINT_FOR_MAJOR_COMPANY } from "datas/constantDatas";
import { colors } from "datas/colors";
import Overlay from "../components/Overlay";
import EndingAlbum from "../components/EndingAlbum";

export type endingCode =
  | "majorCompany"
  | "freelancer"
  | "coinInvestor"
  | "selfEmployed"
  | "becomeTurtle";
type endingTitle =
  | "대기업 취업"
  | "커뮤니티 사이트 운영자"
  | "코인투자자로 인생역전"
  | "치킨집 사장"
  | "거북이가 되다";

export type EndingDataSet = {
  code: endingCode;
  title: endingTitle;
  description: string;
  imageUrl: string;
};

export default function Ending() {
  const { state, isShowCoinInvestorEvent } = useStateContext();
  const [ending, isTurtleEnding] = useEndingType();

  const [backgroundImage, setBackgroundImage] = useState(
    `${
      process.env.NODE_ENV === "development" ? "" : "https://yellyb.github.io"
    }/game-dev_maker/images/home.png`
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isEndingAlbumOpen, setIsEndingAlbumOpen] = useState(false);

  const getEndingType: EndingDataSet = useMemo(() => {
    if (isTurtleEnding)
      return {
        code: "becomeTurtle",
        title: "거북이가 되다",
        description: '"' + "...... 바른 자세로 살걸 그랬어." + '"',
        imageUrl:
          "https://yellyb.github.io/game-dev_maker/images/ending/becomeTurtle.png",
      };

    if (isShowCoinInvestorEvent) {
      return {
        code: "coinInvestor",
        title: "코인투자자로 인생역전",
        description: "역시 인생은 한방이죠!",
        imageUrl:
          "https://yellyb.github.io/game-dev_maker/images/ending/coinInvestor.png",
      };
    }
    if (state.codingSkillPoint >= NEEDED_POINT_FOR_MAJOR_COMPANY) {
      if (state.socialSkillPoint >= NEEDED_POINT_FOR_MAJOR_COMPANY) {
        return {
          code: "majorCompany",
          title: "대기업 취업",
          description: "원하는걸 이뤄냈군요! 부모님이 기뻐하시겠어요.",
          imageUrl:
            "https://yellyb.github.io/game-dev_maker/images/ending/majorCompany.png",
        };
      }
      return {
        code: "freelancer",
        title: "커뮤니티 사이트 운영자",
        description: "집이 곧 일터. 내향인이라면 최고의 직업일수도..??",
        imageUrl:
          "https://yellyb.github.io/game-dev_maker/images/ending/freelancer.png",
      };
    }
    return {
      code: "selfEmployed",
      title: "치킨집 사장",
      description: "뜻대로는 되지 않았지만.. 뭐, 이런게 인생이죠.",
      imageUrl:
        "https://yellyb.github.io/game-dev_maker/images/ending/selfEmployed.png",
    };
  }, [
    isShowCoinInvestorEvent,
    isTurtleEnding,
    state.codingSkillPoint,
    state.socialSkillPoint,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundImage(getEndingType.imageUrl);
    }, 0);

    return () => clearTimeout(timer);
  }, [getEndingType.code]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2초 후에 div를 표시

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return (
    <>
      <Background
        className="container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Content>
          <Title>{getEndingType.title}</Title>
          <Description>{getEndingType.description}</Description>
          <GuideAnotherEnding
            className={isVisible ? "visible" : ""}
            onClick={() => setIsEndingAlbumOpen(true)}
          >
            → 다른 엔딩?
          </GuideAnotherEnding>
        </Content>
      </Background>

      <Overlay
        isShow={isEndingAlbumOpen}
        onClose={() => {
          setIsEndingAlbumOpen(false);
        }}
      >
        <EndingAlbum />
      </Overlay>
    </>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background: black;

  width: 100%;
  height: 100%;

  transition: background-image 2s ease-in-out;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  flex: 1;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.65);
  color: ${colors.white};
  height: 100px;
  margin: 18px;
  padding: 18px;

  outline: 6px solid rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  p {
    margin: 18px;
  }
`;

const Title = styled.p`
  font-size: 24px;
`;
const Description = styled.p`
  color: ${colors.lightGray};
`;

const GuideAnotherEnding = styled.div`
  float: right;

  opacity: 0;
  transition: opacity 1s ease-in-out;

  &.visible {
    opacity: 1;
  }
  &:hover {
    cursor: pointer;
    color: ${colors.lightGray};
  }
`;
