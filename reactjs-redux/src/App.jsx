import "./App.css";
import CakeContainer from "./components/CakeContainer";
import HooksCakeContainer from "./components/HooksCakeContainer";
import IceCreamContainer from "./components/IceCreamContainer";
import NewCakeContainer from "./components/NewCakeContainer";

function App() {
  return (
    <>
      <h1>Cakes</h1>
      <NewCakeContainer />
      <HooksCakeContainer />
      <CakeContainer />
      <h1>IceCream</h1>
      <IceCreamContainer />
    </>
  );
}

export default App;
