/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Family } from "../Family";
import NameHeader from "../components/NameHeader";
import ImageBody from "../components/ImageBody";
import FamRole from "../components/FamRole";

function Member({ isMobile }) {
  const { id } = useParams();
  const [cat, setCat] = useState([]);

  useEffect(() => {
    setCat((kittyCat) => [...kittyCat, Family[id - 1]]);
    document.documentElement.style.setProperty(
      "--bodyColor",
      Family[id - 1]?.bgcolor
    );
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {cat.map((item) => {
        const origin = window.location.origin;
        const url = `${origin}/fam/${item?.imgfile}`;
        return (
          <div key={item?.id}>
            <NameHeader name={item?.name} />
            <ImageBody image={url} isMobile={isMobile} />
            <FamRole role={item?.role} />
          </div>
        );
      })}
    </div>
  );
}

export default Member;
