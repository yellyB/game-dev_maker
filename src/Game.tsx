import { useState } from "react";
import { SchedulesProvider } from "./context/schedules.context";
import Room from "./pages/Room";

type GameState = "init_setting" | "playing" | "end";

export default function Game() {
  const [state, setState] = useState<GameState>("playing");

  return (
    <>
      {state === "playing" && (
        <SchedulesProvider>
          <Room />
        </SchedulesProvider>
      )}
    </>
  );
}
