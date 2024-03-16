import React, { createContext, useContext, useState } from "react";
import { START_MONTH } from "../datas/constantDatas";
import { GameState } from "types";

interface Props {
  children: React.ReactNode;
}

const GameContext = createContext<{
  gameState: GameState;
  updateGameState: (newValue: GameState) => void;
  month: number;
  moveToNextMonth: () => void;
}>({
  gameState: "playing",
  updateGameState: () => {},
  month: START_MONTH,
  moveToNextMonth: () => {},
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }: Props) => {
  const [gameState, setGameState] = useState<GameState>("playing");
  const [month, setMonth] = useState(START_MONTH);

  const updateGameState = (newValue: GameState) => {
    setGameState(newValue);
  };

  const moveToNextMonth = () => {
    setMonth(month + 1);
  };

  return (
    <GameContext.Provider
      value={{ gameState, updateGameState, month, moveToNextMonth }}
    >
      {children}
    </GameContext.Provider>
  );
};
