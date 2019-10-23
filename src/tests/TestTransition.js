import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./transition.css";
const TestTransition = () => {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <CSSTransition
        onEnter={el => (el.style.color = "blue")} // 也可以在.css写
        in={inProp}
        timeout={200}
        classNames="my-node"
      >
        <div>{"I'll receive my-node-* classes"}</div>
      </CSSTransition>
      <button type="button" onClick={() => setInProp(true)}>
        Click to Enter
      </button>
    </div>
  );
};
export default TestTransition;
