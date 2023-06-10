function ImageBody({ image, isMobile }) {
    return (
      <div>
        <img width={isMobile ? "390px" : "800px"} src={`${image}.webp`} alt={`fam/${image}.webp`}/>
      </div>
    );
  }
  
  export default ImageBody;
  