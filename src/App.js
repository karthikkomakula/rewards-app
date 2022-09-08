import "./App.css";
import Rewards from "./Rewards";

function App() {
  return (
    <div className="App">
      <h1>Customer Rewards Table</h1>
      <Rewards months={["Jul", "Aug", "Sep"]} />
    </div>
  );
}

export default App;
