
import React from 'react';

const Arrow = (props) => {
    return (
        <div
          className={props.className}
          style={{ ...props.style, display: "block", background: "#727891", borderRadius: "10px" }}
          onClick={props.onClick}
        />
      );
}

export default Arrow;