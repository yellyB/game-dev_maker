import React, { createContext, useContext, useState } from "react";
import { GameState } from "~/types";

interface Props {
  children: React.ReactNode;
}

const GameContext = createContext<{
  gameState: GameState;
  update: (newValue: GameState) => void;
}>({ gameState: "playing", update: () => {} });

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }: Props) => {
  const [gameState, setGameState] = useState<GameState>("playing");

  const update = (newValue: GameState) => {
    setGameState(newValue);
  };

  return (
    <GameContext.Provider value={{ gameState, update }}>
      {children}
    </GameContext.Provider>
  );
};
