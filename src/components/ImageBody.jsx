function ImageBody({ image, isMobile }) {
    return (
      <div>
        <img width={isMobile ? "300px" : "800px"} src={`fam/${image}.webp`} />
      </div>
    );
  }
  
  export default ImageBody;
  