import { useState, useEffect } from "react";
import "./App.css";
import { Family } from "./Family";
import NameHeader from "./components/NameHeader";
import ImageBody from "./components/ImageBody";
import FamRole from "./components/FamRole";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [randomCat, setRandomCat] = useState([]);

  function handleResize() {
    window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }

  const getRandomCat = () => {
    return setRandomCat((randomCat) => [
      ...randomCat,
      Family[Math.floor(Family.length * Math.random())],
    ]);
  };

  useEffect(() => {
    return window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return handleResize();
  }, []);

  useEffect(() => {
    return getRandomCat();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {randomCat.map((item) => {
        return (
          <>
            <NameHeader name={item.name} />
            <ImageBody image={item.imgfile} isMobile={isMobile} />
            <FamRole role={item.role} />
          </>
        );
      })}
    </div>
  );
}

export default App;
