import { useEffect, useState } from "react";
import styled from "styled-components";
import EndingAnimation from "../components/EndingAnimation";
import { useStateContext } from "../context/state.context";
import { useEndingType } from "../hooks/useEndingType";
import { MINIMUM_POINT_TO_MAJOR_COMPANY } from "datas/constantDatas";

type endingCode =
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

type EndingDataSet = {
  code: endingCode;
  title: endingTitle;
};

export default function Ending() {
  const { state } = useStateContext();
  const [ending, isTurtleEnding] = useEndingType();

  const [backgroundImage, setBackgroundImage] = useState("/images/home.png"); // 초기 배경 이미지 경로 설정

  const getEndingType: () => EndingDataSet = () => {
    if (isTurtleEnding) return { code: "becomeTurtle", title: "거북이가 되다" };

    const isShowCoinInvestorEvent = false;

    if (isShowCoinInvestorEvent) {
      return { code: "coinInvestor", title: "코인투자자로 인생역전" };
    }
    if (state.codingSkillPoint >= MINIMUM_POINT_TO_MAJOR_COMPANY) {
      if (state.socialSkillPoint >= MINIMUM_POINT_TO_MAJOR_COMPANY) {
        return { code: "majorCompany", title: "대기업 취업" };
      }
      return { code: "freelancer", title: "커뮤니티 사이트 운영자" };
    }
    return { code: "selfEmployed", title: "치킨집 사장" };
  };

  const changeBackgroundImage = () => {
    setBackgroundImage(
      backgroundImage === "/images/ending/대기업.png"
        ? "/images/ending/turtle1.png"
        : "/images/ending/대기업.png"
    ); // 새로운 배경 이미지로 변경
  };

  useEffect(() => {
    // 일정 시간 후에 setShowImage를 호출하여 이미지를 나타나게 함
    const timer = setTimeout(() => {
      setBackgroundImage("/images/ending/turtle1.png"); // 새로운 배경 이미지로 변경
    }, 1000); // 1초 후에 이미지를 나타나게 함

    // 컴포넌트가 언마운트 될 때 타이머를 클리어하여 메모리 누수를 방지
    return () => clearTimeout(timer);
  }, []);

  return (
    <Background
      className="container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      ending: {getEndingType().title}
      {/* <EndingAnimation /> */}
      <button onClick={changeBackgroundImage}>test</button>
    </Background>
  );
}

const Background = styled.div`
  background: black;

  width: 100%;
  height: 100%;

  transition: background-image 2s ease-in-out;
  background-repeat: no-repeat; /* 이미지 반복 없음 */
`;
