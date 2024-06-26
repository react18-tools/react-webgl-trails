import { HTMLProps, useEffect, useRef } from "react";
import styles from "./mouse-trail.module.scss";
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
export const MouseTrail = ({ className, rgb, ...props }: MouseTrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl");
    if (!gl || !canvas) return;
    const onResize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    onResize();
    trails(canvas, gl, rgb);
    addEventListener("resize", onResize);
    // skipcq: JS-0045
    return () => {
      removeEventListener("resize", onResize);
    };
  }, []);
  const cls = [styles.trail, className ?? ""].join(" ");
  return <canvas {...props} className={cls} data-testid="mouse-trail" ref={canvasRef} />;
};
