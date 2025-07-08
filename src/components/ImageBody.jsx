import PropTypes from "prop-types";
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

ImageBody.propTypes = {
  image: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};