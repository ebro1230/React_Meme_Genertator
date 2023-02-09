import React, { useState, useEffect } from "react";

function Meme(props) {
  return (
    <div className="meme">
      <img src={props.url} />
      <p className="upperText">{props.upperText}</p>

      <p className="lowerText">{props.lowerText}</p>
    </div>
  );
}

export default Meme;

//<img className="meme" src={props.url} />
/*      style={{
        backgroundImage: `url(${props.url})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}*/
