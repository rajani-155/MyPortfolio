import React from 'react';
import './SvgButton.css'; 

const SvgButton = ({ text, href }) => {
  return (
    <div className="svg-wrapper">
      <svg height="40" width="150" xmlns="http://www.w3.org/2000/svg">
        <rect id="shape" height="40" width="150" />
        <foreignObject x="0" y="0" width="150" height="40">
          <div className="text-container">
            <a href={href}>{text}</a>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default SvgButton;
