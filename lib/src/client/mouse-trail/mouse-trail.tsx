import { HTMLProps, ReactNode } from "react";
import styles from "./mouse-trail.module.scss";

export interface MouseTrailProps extends HTMLProps<HTMLCanvasElement> {
  children?: ReactNode;
}

/**
 *
 *
 * @example
 * ```tsx
 * <MouseTrail />
 * ```
 */
export const MouseTrail = (props: MouseTrailProps) => {
  const className = [styles.trail, props.className ?? ""].join(" ");
  return <canvas {...props} className={className} data-testid="mouse-trail" />;
};
