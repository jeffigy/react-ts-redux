import "./App.css";
import CakeContainer from "./components/CakeContainer";
import HooksCakeContainer from "./components/HooksCakeContainer";
import IceCreamContainer from "./components/IceCreamContainer";
import ItemContainer from "./components/ItemContainer";
import NewCakeContainer from "./components/NewCakeContainer";
import UserContainer from "./components/UserContainer";

function App() {
  return (
    <>
      <UserContainer />
      {/* <ItemContainer cake />
      <ItemContainer />
      <NewCakeContainer />
      <HooksCakeContainer />
      <CakeContainer />
      <h1>IceCream</h1>
      <IceCreamContainer /> */}
    </>
  );
}

export default App;
