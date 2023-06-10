import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Random from "./pages/Random";
import Xmas from "./pages/Xmas";
import Member from "./pages/Member";
import All from "./pages/All";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    return window.addEventListener("resize", () => {
      window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  useEffect(() => {
    return window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Random isMobile={isMobile} />} />
          <Route path="/:id" element={<Member isMobile={isMobile} />} />
          <Route path="/all" element={<All isMobile={isMobile} />} />
          <Route path="/xmas" element={<Xmas isMobile={isMobile} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
