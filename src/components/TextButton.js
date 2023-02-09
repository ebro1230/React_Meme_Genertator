import React, { useState, useEffect } from "react";

function TextButton(props) {
  return (
    <button value={props.value} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default TextButton;
