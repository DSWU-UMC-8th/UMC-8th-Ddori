import "./App.css";
import Counter from "./components/Counter";
import RandomNumberGenerator from "./components/RandomNumberGenerator";
import UseReducerCompany from "./pages/UseReducerCompany";
import UseReducerPage from "./pages/UseReducerPage";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 100,
      }}
    >
      <Counter />
      <RandomNumberGenerator />
    </div>
  );
}
