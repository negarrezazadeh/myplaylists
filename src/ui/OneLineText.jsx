import React from "react";

function OneLineText({ children, className }) {
  return React.cloneElement(children, {
    className: `truncate ${className || ""}${children.props.className || ""}`
  });
}

export default OneLineText;