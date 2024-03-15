import styled from "styled-components";
import { useGameContext } from "../context/game.context";
import { SchedulesProvider } from "../context/schedules.context";
import Ending from "./Ending";
import Room from "./Room";

export default function Game() {
  const { gameState } = useGameContext();

  return (
    <GameView>
      {gameState === "playing" && (
        <SchedulesProvider>
          <Room />
        </SchedulesProvider>
      )}
      {gameState === "end" && <Ending />}
    </GameView>
  );
}

const GameView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
