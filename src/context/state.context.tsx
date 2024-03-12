import React, { createContext, useContext, useState } from "react";
import { UserState } from "~/types";

interface Props {
  children: React.ReactNode;
}

const initState = {
  name: "김백수",
  money: 50000,
  codingSkillPoint: 0,
  socialSkillPoint: 0,
  stressPoint: 0,
  turtleNeckPoint: 0,
  maxPoint: 100,
};

const StateContext = createContext<{
  state: UserState;
  update: <T extends Partial<UserState>>(paramsToUpdate: T) => void;
}>({ state: initState, update: () => {} });

export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({ children }: Props) => {
  const [state, setState] = useState<UserState>(initState);

  const update = <T extends Partial<UserState>>(paramsToUpdate: T) => {
    setState({ ...state, ...paramsToUpdate });
  };

  return (
    <StateContext.Provider value={{ state, update }}>
      {children}
    </StateContext.Provider>
  );
};
