import React, { Component } from "react";

class DiamondIcon extends Component {
  state = {};
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="suit-icon"
      >
        <polygon points="256,0 45.714,256 256,512 466.286,256" fill="#d71e00" />
        <path
          d="M248.872,448.656c-3.162,3.937-2.533,9.692,1.404,12.853c3.937,3.162,9.692,2.533,12.853-1.404 l64-79.698c3.162-3.937,2.533-9.692-1.404-12.853c-3.937-3.162-9.692-2.533-12.853,1.404L248.872,448.656z"
          fill="#b21606"
        />
      </svg>
    );
  }
}

export default DiamondIcon;
