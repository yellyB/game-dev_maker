import styled from "styled-components";
import "./App.css";
import { GameProvider } from "./context/game.context";
import Game from "./pages/Game";

function App() {
  return (
    <Screen>
      <View>
        <GameProvider>
          <Game />
        </GameProvider>
      </View>
    </Screen>
  );
}

const Screen = styled.div`
  display: flex;
  width: 100wh;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const View = styled.div`
  width: 1000px;
  height: 800px;
`;

export default App;
