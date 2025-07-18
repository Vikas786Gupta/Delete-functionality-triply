import React from "react";
import logo from "../assets/Triply.png"
// interface ImgProps {
//   src: string;
//   alt: string;
//   width?: number | string;
//   height?: number | string;
//   className?: string;
// }

const Logo = () => {
    return (
        <img
            src={logo}
            alt="triply"
            width={48}
        //   height={height}
        //   className={className}
        //   loading="lazy" // Improves performance by lazy loading
        />
    );
};

export default Logo;