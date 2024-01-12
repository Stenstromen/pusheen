import { useEffect } from "react";
import { Helmet } from "react-helmet";
import NameHeader from "../components/NameHeader";
import ImageBody from "../components/ImageBody";

function Xmas({ isMobile }) {
  useEffect(() => {
    return document.documentElement.style.setProperty("--bodyColor", "#fbf0e3");
  });

  const origin = window.location.origin;
  const xmaskitty = `${origin}/fam/xmaskitty`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Helmet>
        <meta name="theme-color" content="#fbf0e3" />
        <meta property="og:image" content={xmaskitty} />
        <meta property="og:image:width" content="228" />
        <meta property="og:image:height" content="221" />
        <title>X-Mas kitty | Pusheen.se</title>
      </Helmet>
      <NameHeader name="X-Mas kitty" />
      <ImageBody image={xmaskitty} isMobile={isMobile} />
    </div>
  );
}

export default Xmas;
