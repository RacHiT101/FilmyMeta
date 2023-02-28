import Cards from "./components/Cards";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addmovie from "./components/Addmovie";
import Details from "./components/Details";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const Appstate = createContext();

function App() {
  const [login,setLogin] = useState(false);
  const [userName,setUserName] = useState(false);
  return (
    <Appstate.Provider value={ {login , setLogin , userName, setUserName } }>
      <Router>
        <div className="relative">
          <Header />
          <Routes>
            <Route exact path="/" element={<Cards />}></Route>
            <Route path="/addmovie" element={<Addmovie />}></Route>
            <Route path="/details/:id" element={<Details />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </Router>
    </Appstate.Provider>
  );
}
export {Appstate}
export default App;
