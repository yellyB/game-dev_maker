import { useState } from "react";
import Room from "./pages/Room";

type GameState = "init_setting" | "playing" | "end";

function Game() {
  const [state, setState] = useState<GameState>("playing");

  return <>{state === "playing" && <Room />}</>;
}

export default Game;
