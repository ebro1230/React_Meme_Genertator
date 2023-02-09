import React, { useState, useEffect } from "react";

function RandomButton(props) {
  return <button onClick={props.onClick}>{props.value}</button>;
}

export default RandomButton;
