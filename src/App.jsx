import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Review from "./pages/Review";
import Notfound from "./pages/Notfound";
// import { useReducer } from "react";

function App() {
  // const [data, dispatch] = useReducer(reducer, mockData);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/review" element={<Review />} />
      <Route path="/new" element={<New />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
