import { Helmet } from "react-helmet";

function ImageBody({ image, isMobile }) {
  return (
    <div>
      <Helmet>
        <link rel="preload" as="image" href={`${image}.webp`} />
      </Helmet>
      <img
        width={isMobile ? "390px" : "800px"}
        src={`${image}.webp`}
        alt={`fam/${image}.webp`}
      />
    </div>
  );
}

export default ImageBody;
