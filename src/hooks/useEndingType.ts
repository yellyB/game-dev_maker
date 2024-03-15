import { useMemo, useState } from "react";
import { useStateContext } from "../context/state.context";
import { TURTLE_ENDING_MINIMUM_POINT } from "../datas/constantDatas";

export const useEndingType = () => {
  // todo: 개선이 시급..
  // 엔딩타입을 따로 관리하는게 나은가? state 혹은 gameState 랑 같이 관리하는게 나은가?
  const { state, update } = useStateContext();

  const [ending, setEnding] = useState(state);

  const isTurtleEnding = useMemo(() => {
    if (state.turtleNeckPoint >= TURTLE_ENDING_MINIMUM_POINT) return true;
    return false;
  }, [state]);

  return [ending, isTurtleEnding];
};
