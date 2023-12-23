import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="preloader">
      <Image 
        src="/images/loader.gif"
        alt="" 
        width={109}
        height={77}
        className=""
      />
    </div>
  );
};

export default Loader;
