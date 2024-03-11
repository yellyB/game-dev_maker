import { useEffect, useState } from "react";
import styled from "styled-components";
import EndingAnimation from "../components/EndingAnimation";
import { useStateContext } from "../context/state.context";
import { useEndingType } from "../hooks/useEndingType";

export default function Ending() {
  const { state, update } = useStateContext();
  const [ending, isTurtleEnding] = useEndingType();

  type endingTypeCode =
    | "majorCompany"
    | "freelancer"
    | "coinInvestor"
    | "selfEmployed"
    | "becomeTurtle";
  type endingTypeName =
    | "대기업"
    | "프리랜서"
    | "코인투자자"
    | "자영업자"
    | "거북이";

  const getEndingType = () => {
    if (isTurtleEnding) return "becomeTurtle";

    const isShowCoinInvestorEvent = false;

    if (isShowCoinInvestorEvent) {
      return "coinInvestor";
    }
    if (state.codingSkillPoint >= 70) {
      if (state.socialSkillPoint >= 70) {
        return "majorCompany";
      }
      return "freelancer";
    }
    return "selfEmployed";
  };

  return (
    <Background className="container">
      ending: {getEndingType()}
      <EndingAnimation />
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;

  background: white;

  border: 10px solid pink;
`;
