import React from "react";
import styled from "styled-components";
import { useStateContext } from "../context/state.context";

export default function EndingAnimation() {
  const [backgroundImage, setBackgroundImage] = React.useState(
    "/images/ending/turtle1.png"
  ); // 초기 배경 이미지 경로 설정

  const changeBackgroundImage = () => {
    setBackgroundImage("/images/ending/대기업.png"); // 새로운 배경 이미지로 변경
  };

  return (
    <Container>
      [EndingAnimation]
      <div
        // className="image-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <img src="/images/ending/turtle1.png" alt="Image 1" className="image" />
      <button onClick={changeBackgroundImage}>test</button>
    </Container>
  );
}

const Container = styled.div`
  .image-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-image 1s ease-in-out;
  }

  .image {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-image 1s ease-in-out;
  }
`;
