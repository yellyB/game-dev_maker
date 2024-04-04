import { styled } from "styled-components";
import { colors } from "../datas/colors";

const Divider = styled.div<{
  direction?: "horizen" | "vertical";
  thickness?: number;
  length?: number;
}>`
  ${(props) =>
    !props.direction || props.direction === "horizen"
      ? `
    width: ${props.length ? `${props.length}px` : "100%"};
    height:  ${props.thickness ? props.thickness : 1}px;`
      : `
    width: ${props.thickness ? props.thickness : 1}px;
    height: ${props.length ? `${props.length}px` : "100%"};
`}

  background-color: ${colors.lightGray};
`;

export default Divider;
