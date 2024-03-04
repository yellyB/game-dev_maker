import { useState } from "react";
import styled from "styled-components";

interface Props {
  isShow: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Overlay({ isShow, onClose, children }: Props) {
  return (
    <>
      {isShow && (
        <Container onClick={onClose}>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
          >
            {children}
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 색상과 투명도 조절 */
  z-index: 999; /* 다른 요소 위에 오도록 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Overlay;
