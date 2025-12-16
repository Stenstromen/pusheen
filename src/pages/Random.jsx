import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Helmet from "../components/Helmet";
import "../App.css";
import Family from "../Family";
import NameHeader from "../components/NameHeader";
import ImageBody from "../components/ImageBody";
import FamRole from "../components/FamRole";

function Random({ isMobile }) {
  const [randomCat, setRandomCat] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    return setRandomCat((randomCat) => [
      ...randomCat,
      Family[Math.floor(Family?.length * Math.random())],
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