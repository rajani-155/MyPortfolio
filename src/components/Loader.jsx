import React from 'react';

// Helper functions and types
const cssUnit = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true,
};

function parseLengthAndUnit(size) {
  if (typeof size === "number") {
    return { value: size, unit: "px" };
  }
  let value;
  const valueString = (size.match(/^[0-9.]*/) || "").toString();
  if (valueString.includes(".")) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }
  const unit = (size.match(/[^0-9]*$/) || "").toString();
  if (cssUnit[unit]) {
    return { value, unit };
  }
  console.warn(`React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`);
  return { value, unit: "px" };
}



const createAnimation = (loaderName, frames, suffix) => {
  const animationName = `react-spinners-${loaderName}-${suffix}`;
  if (typeof window === "undefined" || !window.document) {
    return animationName;
  }
  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet;
  const keyFrames = `
    @keyframes ${animationName} {
      ${frames}
    }
  `;
  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0);
  }
  return animationName;
};

// Animation definitions
const right = createAnimation(
  'RingLoader',
  '0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)} 100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}',
  'right'
);

const left = createAnimation(
  'RingLoader',
  '0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)} 100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}',
  'left'
);

// Component
const Loader = ({
  loading = true,
  color ='rgb(26 46 5)',
  speedMultiplier = 1,
  cssOverride = {},
  size = 90,
  ...additionalProps
}) => {
  const { value, unit } = parseLengthAndUnit(size);
  const wrapper = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '9999',
    backgroundColor: 'rgb(134 239 172)',
    ...cssOverride,
  };

  const style = (i) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${value}${unit}`,
    height: `${value}${unit}`,
    border: `${value / 10}${unit} solid ${color}`,
    opacity: '0.4',
    borderRadius: '50%',
    animationFillMode: 'forwards',
    perspective: '800px',
    animation: `${i === 1 ? right : left} ${2 / speedMultiplier}s 0s infinite linear`,
  });

  if (!loading) {
    return null;
  }

  return (
    <div className="h-screen flex items-center justify-center fixed inset-0" style={wrapper} {...additionalProps}>
      <div style={style(1)} />
      <div style={style(2)} />
    </div>
  );
};

export default Loader;
