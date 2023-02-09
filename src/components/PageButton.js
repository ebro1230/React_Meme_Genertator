import React, { useState, useEffect } from "react";

function PageButton(props) {
  return (
    <button value={props.value} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default PageButton;
