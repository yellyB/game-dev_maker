import { useState } from "react";
import styled from "styled-components";

function TimeTable({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Container isOpen={isOpen}>
      달력 <button onClick={onClose}>close</button>
    </Container>
  );
}

const Container = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "display" : "none")};
  position: absolute;
  top: 100px;
  border: 1px solid blue;
`;

export default TimeTable;
