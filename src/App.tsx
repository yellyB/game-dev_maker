import styled from "styled-components";
import "./App.css";
import Game from "./Game";

function App() {
  return (
    <Screen>
      <View>
        <Game />
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
