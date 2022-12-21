import { useEffect } from "react";
import NameHeader from "../components/NameHeader";
import ImageBody from "../components/ImageBody";

function Xmas({ isMobile }) {
  useEffect(() => {
    return document.documentElement.style.setProperty("--bodyColor", "#fbf0e3");
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
      <NameHeader name="X-Mas kitty" />
      <ImageBody image="xmaskitty" isMobile={isMobile} />
    </div>
  );
}

export default Xmas;
