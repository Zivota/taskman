import ReactDOM from "react-dom";
import "../style/components/_UI.scss";

const Overlay = (props) => {
  return ReactDOM.createPortal(
    <div className="overlay" onClick={props.onClick}></div>,
    document.getElementById("portal")
  );
};

export default Overlay;
