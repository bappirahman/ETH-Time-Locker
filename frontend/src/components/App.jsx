import Nav from "./Nav";
import Home from "./Home";
import Withdraw from "./Withdraw";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {

  return (
    <div className="App">
      <p style={{backgroundColor: "black",color: "white", textAlign: "center", margin: 0}}>Note: Please use rinkeby Testnet</p>
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/withdraw" element={<Withdraw />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
