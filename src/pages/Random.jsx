/* eslint-disable jsx-a11y/anchor-has-content */
import { useState, useEffect } from "react";
import "../App.css";
import { Family } from "../Family";
import NameHeader from "../components/NameHeader";
import ImageBody from "../components/ImageBody";
import FamRole from "../components/FamRole";

function Random({ isMobile }) {
  const [randomCat, setRandomCat] = useState([]);

  useEffect(() => {
    return setRandomCat((randomCat) => [
      ...randomCat,
      Family[Math.floor(Family.length * Math.random())],
    ]);
  }, []);

  useEffect(() => {
    return (
      randomCat[0] &&
      document.documentElement.style.setProperty(
        "--bodyColor",
        randomCat[0].bgcolor
      )
    );
  });

  return (
    <>
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
              <ImageBody image={"fam/" + item.imgfile} isMobile={isMobile} />
              <FamRole role={item.role} />
            </div>
          );
        })}
      </div>
      {Family.map((item) => {
        return (
          <a href={`/${item.id}`} key={item.id} aria-label={item.name}></a>
        );
      })}
      <a href="/all" aria-label="all"></a>
      <a href="/xmas" aria-label="xmas"></a>
    </>
  );
}

export default Random;
