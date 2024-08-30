import React from "react";
import "./App.css";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Content from "./Component/Content";
import Homepage from "./Homepage";
import Modify from "./Component/Modify";
import Create from "./Component/Create";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* 유저 모드 */}
        {/* <Route index element={<Homepage />} /> */}
        {/* <Route path="/findcard" element={<Findcard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
