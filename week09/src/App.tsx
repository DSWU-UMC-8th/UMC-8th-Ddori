import "./App.css";
import { Provider } from "react-redux";
import CartList from "./components/CartList";
import Counter from "./components/Counter";
import Navbar from "./components/Navbar";
import RandomNumberGenerator from "./components/RandomNumberGenerator";
import UseReducerCompany from "./pages/UseReducerCompany";
import UseReducerPage from "./pages/UseReducerPage";
import store from "./store/store";
import PriceBox from "./components/PriceBox";

export default function App() {
  return (
    <Provider store={store}>
      <Navbar/>
      <CartList/>
      <PriceBox/>
    </Provider>
  );
}
