import { styled } from "styled-components";
import { colors } from "../datas/colors";

const ButtonStyle = styled.button<{
  color?: string;
  size?: "medium" | "large";
}>`
  background-color: ${(props) => props.color || colors.blue};
  border-color: ${(props) => props.color || colors.blue};
  color: white;
  cursor: pointer;
  transition: all 0.1s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  ${(props) =>
    !props.size || props.size === "medium"
      ? `
      border-width: 8px;
      font-size: 16px;
      padding: 14px 26px;`
      : `
      border-width: 12px;
      font-size: 22px;
      padding: 18px 34px;
  `}

  &:hover {
    ${(props) =>
      !props.disabled &&
      `
    transform: translateY(-2px);
    background-color: darken(0.3, ${props.color || colors.blue});
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    `};
  }

  &:active {
    ${(props) =>
      !props.disabled &&
      `transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);`};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const playClickSound = () => {
  const audio = new Audio("/game-dev_maker/sound/click.wav");
  audio.play();
};

interface ButtonProps {
  color?: string;
  size?: "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button = ({ onClick, children, ...props }: ButtonProps) => {
  const handleClick = () => {
    playClickSound();
    onClick?.();
  };

  return (
    <ButtonStyle onClick={handleClick} {...props}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
