import React, { useContext } from "react";
import { BoardContext } from "../context/context";
import "../style/components/_UI.scss";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const theme = useContext(BoardContext).theme;

  return ReactDOM.createPortal(
    <div className={`modal modal__${theme}`}>{props.children}</div>,
    document.getElementById("portal")
  );
};

export default Modal;
