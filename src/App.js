import Cards from "./components/Cards";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addmovie from "./components/Addmovie";
import Details from "./components/Details";

function App() {
  return (
    <Router>
      <div className="relative">
        <Header />
        <Routes>
          <Route exact path="/" element={<Cards />}></Route>
          <Route path="/addmovie" element={<Addmovie/>}></Route>
          <Route path="/details/:id" element={<Details/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
