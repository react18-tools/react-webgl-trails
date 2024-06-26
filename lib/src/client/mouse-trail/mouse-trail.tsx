import { HTMLProps, ReactNode, useEffect, useRef } from "react";
import styles from "./mouse-trail.module.scss";

export interface MouseTrailProps extends HTMLProps<HTMLCanvasElement> {
  children?: ReactNode;
}

/**
 * @example
 * ```tsx
 * <MouseTrail />
 * ```
 */
export const MouseTrail = ({ className, ...props }: MouseTrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl");
    if (!gl || !canvas) return;
    const onResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = innerWidth;
        canvasRef.current.height = innerHeight;
      }
    };
    onResize();
    addEventListener("resize", onResize);
    // skipcq: JS-0045
    return () => {
      removeEventListener("resize", onResize);
    };
  }, []);
  const cls = [styles.trail, className ?? ""].join(" ");
  return <canvas {...props} className={cls} data-testid="mouse-trail" ref={canvasRef} />;
};
