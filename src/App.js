import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Random from "./pages/Random";
import Xmas from "./pages/Xmas";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Random isMobile={isMobile} />} />
          <Route path="/xmas" element={<Xmas isMobile={isMobile} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
