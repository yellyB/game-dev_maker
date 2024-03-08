import styled from "styled-components";
import { useGameContext } from "../context/game.context";
import { SchedulesProvider } from "../context/schedules.context";
import Room from "./Room";

export default function Game() {
  const { gameState, update } = useGameContext();

  return (
    <GameView>
      {gameState === "playing" && (
        <SchedulesProvider>
          <Room />
        </SchedulesProvider>
      )}
      {gameState === "end" && (
        <div style={{ border: "10px solid pink" }}>end</div>
      )}
    </GameView>
  );
}

const GameView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
