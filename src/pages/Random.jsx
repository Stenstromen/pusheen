import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Helmet from "../components/Helmet";
import "../App.css";
import Family from "../Family";
import NameHeader from "../components/NameHeader";
import ImageBody from "../components/ImageBody";
import FamRole from "../components/FamRole";

// Cookie utility functions
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function Random({ isMobile }) {
  const [randomCat, setRandomCat] = useState([]);

  useEffect(() => {
    const lastCatId = getCookie("lastRandomCat");
    const lastCatIdNum = lastCatId ? parseInt(lastCatId, 10) : null;

    const availableCats = Family.filter(
      (cat) => cat.id !== lastCatIdNum
    );

    const catsToChooseFrom =
      availableCats.length > 0 ? availableCats : Family;
    const randomIndex = Math.floor(catsToChooseFrom.length * Math.random());
    const selectedCat = catsToChooseFrom[randomIndex];

    setCookie("lastRandomCat", selectedCat.id.toString());

    // eslint-disable-next-line react-hooks/set-state-in-effect
    return setRandomCat([selectedCat]);
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
        {randomCat?.map((item) => {
          return (
            <div key={item.id}>
              <Helmet>
                <meta name="theme-color" content={item.bgcolor} />
                <meta
                  property="og:image"
                  content={"fam/" + item.imgfile + ".webp"}
                />
                <meta property="og:image:width" content={item.width} />
                <meta property="og:image:height" content={item.height} />
                <title>{item.name} | Pusheen.se</title>
              </Helmet>
              <NameHeader name={item.name} />
              <ImageBody image={"fam/" + item.imgfile} isMobile={isMobile} />
              <FamRole role={item.role} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Random;

Random.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};