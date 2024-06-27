/* eslint-disable react/function-component-definition -- for better minification*/

import { type HTMLProps, useEffect, useRef } from "react";
import { trails } from "../../utils";

export interface MouseTrailProps extends HTMLProps<HTMLCanvasElement> {
  /** Trail color tuple RGB color values - 0.0 to 1.0 */
  rgb?: [number, number, number];
}

/**
 * @example
 * ```tsx
 * <MouseTrail />
 * ```
 */
export const MouseTrail = ({ rgb, ...props }: MouseTrailProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl");
    if (!gl || !canvas) return;
    const onResize = (): void => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      // canvas.style.width = `${innerWidth}px`;
      // canvas.style.height = `${innerHeight}px`;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    onResize();
    trails(gl, rgb);
    addEventListener("resize", onResize);
    // skipcq: JS-0045
    return () => {
      removeEventListener("resize", onResize);
    };
  }, [rgb]);

  return (
    <canvas
      style={{ pointerEvents: "none", position: "fixed", top: 0, left: 0 }}
      {...props}
      data-testid="mouse-trail"
      ref={canvasRef}
    />
  );
};
