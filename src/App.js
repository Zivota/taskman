import { Routes, Route, Link } from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./components/Home";
import Error from "./components/Error";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:boardID" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
