import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { MouseTrail } from "./mouse-trail";

describe.concurrent("mouse-trail", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<MouseTrail className={clx} />);
		expect(screen.getByTestId("mouse-trail").classList).toContain(clx);
	});
});
