import React from "react";
const TextInput = (props) => {
  return (
    <input
      className={props.className}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      id={props.id}
    ></input>
  );
};

export default TextInput;
