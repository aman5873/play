import { useRef, useEffect, useState } from "react";

export const FullCenterDimensionDiv = ({ children, style, ...props }: any) => {
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    const updateDimensions = () => {
      const { offsetWidth, offsetHeight } = element;
      const computedStyle = getComputedStyle(element);

      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);

      const contentWidth = offsetWidth - paddingLeft - paddingRight;
      const contentHeight = offsetHeight - paddingTop - paddingBottom;

      setDimensions({ width: contentWidth, height: contentHeight });
    };

    updateDimensions(); // Initial update

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const defaultStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div ref={divRef} style={defaultStyle} {...props}>
      {typeof children === "function" ? children(dimensions) : children}
    </div>
  );
};

const FullCenterDiv = ({ children, style, ...props }) => {
  const divRef = useRef(null);

  const defaultStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  return (
    <div ref={divRef} style={defaultStyle} {...props}>
      {children}
    </div>
  );
};

export default FullCenterDiv;
