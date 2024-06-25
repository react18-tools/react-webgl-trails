import { HTMLProps, ReactNode } from "react";
import styles from "./mouse-trail.module.scss";

export interface MouseTrailProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

/**
 * 
 *
 * @example
 * ```tsx
 * <MouseTrail />
 * ```
 * 
 * @source - Source code
 */
export const MouseTrail = ({ children, ...props }: MouseTrailProps) => {
  const className = [props.className, styles["mouse-trail"]].filter(Boolean).join(" ");
	return (
		<div {...props} className={className} data-testid="mouse-trail">
			{children}
		</div>
	);
}
