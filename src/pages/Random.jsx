import { useState, useEffect } from "react";
import "../App.css";
import { Family } from "../Family";
import NameHeader from "../components/NameHeader";
import ImageBody from "../components/ImageBody";
import FamRole from "../components/FamRole";

function Random({isMobile}) {
  const [randomCat, setRandomCat] = useState([]);

  useEffect(() => {
    return setRandomCat((randomCat) => [
      ...randomCat,
      Family[Math.floor(Family.length * Math.random())],
    ]);
  }, []);

  useEffect(() => {
    return randomCat[0]
      ? document.documentElement.style.setProperty(
          "--bodyColor",
          randomCat[0].bgcolor
        )
      : console.log("meow");
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {randomCat.map((item) => {
        return (
          <div key={item.id}>
            <NameHeader name={item.name} />
            <ImageBody image={item.imgfile} isMobile={isMobile} />
            <FamRole role={item.role} />
          </div>
        );
      })}
    </div>
  );
}

export default Random;
