import { useEffect } from "react";
import { styled } from "styled-components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  onConfirm: () => void;
}

export default function Dialog({
  isOpen,
  onClose,
  children,
  title,
  onConfirm,
}: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 다이얼로그가 열린 경우, 스크롤 막기
    } else {
      document.body.style.overflow = "unset"; // 다이얼로그가 닫힌 경우, 스크롤 복원
    }
    return () => {
      document.body.style.overflow = "unset"; // 컴포넌트가 언마운트되면 스크롤 복원
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <Content>
        <Title>{title}</Title>
        {children}
        <ButtonWrapper>
          <ConfirmButton
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            확인
          </ConfirmButton>
        </ButtonWrapper>
      </Content>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid blue;
`;

const Content = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const ConfirmButton = styled(Button)`
  background-color: #28a745;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 20px;
`;
