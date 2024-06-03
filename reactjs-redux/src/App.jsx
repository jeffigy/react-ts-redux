import "./App.css";
import CakeContainer from "./components/CakeContainer";
import HooksCakeContainer from "./components/HooksCakeContainer";
import IceCreamContainer from "./components/IceCreamContainer";

function App() {
  return (
    <>
      <h1>Cakes</h1>
      <HooksCakeContainer />
      <CakeContainer />
      <h1>IceCream</h1>
      <IceCreamContainer />
    </>
  );
}

export default App;
